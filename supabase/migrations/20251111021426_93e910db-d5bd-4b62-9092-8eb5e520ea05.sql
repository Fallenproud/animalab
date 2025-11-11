-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  framework TEXT DEFAULT 'react' CHECK (framework IN ('react', 'vue', 'vanilla')),
  template TEXT DEFAULT 'blank',
  settings JSONB DEFAULT '{
    "typescript": true,
    "tailwind": true,
    "linting": true,
    "formatting": true
  }'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indexes for projects
CREATE INDEX idx_projects_user_id ON public.projects(user_id);
CREATE INDEX idx_projects_updated_at ON public.projects(updated_at DESC);

-- Enable RLS on projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Projects RLS Policies
CREATE POLICY "Users can view their own projects"
  ON public.projects FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own projects"
  ON public.projects FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects"
  ON public.projects FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects"
  ON public.projects FOR DELETE
  USING (auth.uid() = user_id);

-- Create project_files table
CREATE TABLE IF NOT EXISTS public.project_files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  path TEXT NOT NULL,
  content TEXT,
  language TEXT,
  is_binary BOOLEAN DEFAULT FALSE,
  file_size INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(project_id, path)
);

-- Create indexes for project_files
CREATE INDEX idx_files_project_id ON public.project_files(project_id);
CREATE INDEX idx_files_path ON public.project_files(path);
CREATE INDEX idx_files_updated_at ON public.project_files(updated_at DESC);

-- Enable RLS on project_files
ALTER TABLE public.project_files ENABLE ROW LEVEL SECURITY;

-- Security definer function to check project ownership
CREATE OR REPLACE FUNCTION public.user_owns_project(project_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.projects
    WHERE id = project_id
      AND user_id = auth.uid()
  );
$$;

-- Project files RLS Policies
CREATE POLICY "Users can view files in their projects"
  ON public.project_files FOR SELECT
  USING (public.user_owns_project(project_id));

CREATE POLICY "Users can create files in their projects"
  ON public.project_files FOR INSERT
  WITH CHECK (public.user_owns_project(project_id));

CREATE POLICY "Users can update files in their projects"
  ON public.project_files FOR UPDATE
  USING (public.user_owns_project(project_id));

CREATE POLICY "Users can delete files in their projects"
  ON public.project_files FOR DELETE
  USING (public.user_owns_project(project_id));

-- Create ai_conversations table
CREATE TABLE IF NOT EXISTS public.ai_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  messages JSONB NOT NULL DEFAULT '[]'::jsonb,
  context JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indexes for ai_conversations
CREATE INDEX idx_conversations_project_id ON public.ai_conversations(project_id);
CREATE INDEX idx_conversations_user_id ON public.ai_conversations(user_id);
CREATE INDEX idx_conversations_updated_at ON public.ai_conversations(updated_at DESC);

-- Enable RLS on ai_conversations
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;

-- AI conversations RLS Policies
CREATE POLICY "Users can view conversations in their projects"
  ON public.ai_conversations FOR SELECT
  USING (public.user_owns_project(project_id) AND auth.uid() = user_id);

CREATE POLICY "Users can create conversations in their projects"
  ON public.ai_conversations FOR INSERT
  WITH CHECK (public.user_owns_project(project_id) AND auth.uid() = user_id);

CREATE POLICY "Users can update their conversations"
  ON public.ai_conversations FOR UPDATE
  USING (public.user_owns_project(project_id) AND auth.uid() = user_id);

CREATE POLICY "Users can delete their conversations"
  ON public.ai_conversations FOR DELETE
  USING (public.user_owns_project(project_id) AND auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Create triggers for updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_project_files_updated_at
  BEFORE UPDATE ON public.project_files
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ai_conversations_updated_at
  BEFORE UPDATE ON public.ai_conversations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for all tables
ALTER TABLE public.projects REPLICA IDENTITY FULL;
ALTER TABLE public.project_files REPLICA IDENTITY FULL;
ALTER TABLE public.ai_conversations REPLICA IDENTITY FULL;
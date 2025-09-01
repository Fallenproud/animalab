# AnimaLab - AI-Powered Design-to-Code Platform

A modern, test-driven platform that transforms design concepts into production-ready React components using AI. Built with a mock-first architecture for seamless development and testing.

## 🚀 Features

- **AI-Powered Code Generation**: Transform design descriptions into clean, responsive React components
- **Real-time Playground**: Interactive environment for testing and iterating on generated code
- **Mock-First Architecture**: Comprehensive mocking system for all services and APIs
- **Comprehensive Testing**: Unit, integration, and E2E tests for all components
- **Modern Tech Stack**: React, TypeScript, Tailwind CSS, Vite, and Vitest
- **Beautiful Design System**: Custom design tokens and component variants

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **Testing**: Vitest, Testing Library, Jest DOM
- **Routing**: React Router DOM
- **UI Components**: Radix UI (shadcn/ui)
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React hooks and Context API

## 📦 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (shadcn/ui)
│   ├── layout/          # Layout components (Header, Footer)
│   ├── landing/         # Landing page components
│   └── playground/      # Playground-specific components
├── pages/               # Route components
├── services/            # Business logic and API services
├── mocks/              # Mock data and responses
├── tests/              # Test files
│   ├── components/     # Component tests
│   ├── services/       # Service tests
│   └── mocks/          # Mock tests
├── hooks/              # Custom React hooks
└── lib/                # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd anima-clone-lab
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm run test Header.test.tsx
```

### Test Structure

- **Unit Tests**: Individual component and service testing
- **Integration Tests**: Component interaction testing  
- **Mock Tests**: Validation of mock services and data
- **E2E Tests**: Full user workflow testing (planned)

### Writing Tests

All tests should follow these patterns:

```typescript
// Component tests
describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});

// Service tests  
describe('ServiceName', () => {
  it('performs expected operation', async () => {
    const result = await service.method();
    expect(result).toEqual(expectedResult);
  });
});
```

## 🎨 Design System

The project uses a comprehensive design system built with Tailwind CSS:

- **Colors**: Semantic color tokens for consistent theming
- **Gradients**: Pre-defined gradient combinations
- **Typography**: Consistent font scales and weights
- **Spacing**: Standardized spacing system
- **Components**: Custom variants for all UI components

### Using Design Tokens

```tsx
// ✅ Correct - Using design system tokens
<Button variant="hero" className="bg-gradient-primary">

// ❌ Incorrect - Direct color usage
<Button className="bg-blue-500 text-white">
```

## 📝 Development Workflow

### Adding New Features

1. **Plan**: Define requirements and update TODO.md
2. **Mock**: Create mock data/services first
3. **Test**: Write tests before implementation
4. **Implement**: Build the feature using design system
5. **Verify**: Ensure all tests pass
6. **Document**: Update README and code comments

### Code Standards

- Use TypeScript for all new code
- Follow React best practices and hooks patterns
- Implement comprehensive error handling
- Write meaningful test cases
- Use semantic HTML and accessibility features
- Follow the established design system

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production  
npm run preview      # Preview production build
npm run test         # Run test suite
npm run test:watch   # Run tests in watch mode
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

## 🎯 Key Components

### Landing Page
- **Header**: Navigation and branding
- **Hero**: Main value proposition and CTA
- **Features**: Platform capabilities showcase

### Playground
- **Input Panel**: AI prompt interface
- **Output Panel**: Generated code and preview
- **Code Preview**: Syntax-highlighted code display
- **Component Preview**: Live component rendering

### Services
- **CodeGenerationService**: Mock AI code generation
- **API Mocks**: Simulated backend responses

## 🚧 Roadmap

See [TODO.md](./TODO.md) for detailed development progress and upcoming features.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Write tests for new functionality
4. Implement the feature
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For questions and support:
- Check the documentation in `/docs`
- Review existing issues and tests
- Create a new issue with detailed description
- Follow the established patterns and conventions
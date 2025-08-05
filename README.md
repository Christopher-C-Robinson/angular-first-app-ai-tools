# Angular First App - AI Tools

A beginner-friendly Angular application for learning modern web development. This project demonstrates building a housing/homes application using Angular's latest features.

## Prerequisites

Before getting started, make sure you have the following installed on your system:

### Required Software
- **Node.js** (version 16 or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`

- **npm** (comes with Node.js)
  - Verify installation: `npm --version`

- **Angular CLI** (will be installed with project dependencies)
  - The project includes Angular CLI as a dev dependency

### System Requirements
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Terminal or command prompt access
- Text editor or IDE (VS Code recommended)

## Getting Started

Follow these steps to set up and run the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/Christopher-C-Robinson/angular-first-app-ai-tools.git
cd angular-first-app-ai-tools
```

### 2. Install Dependencies
Install all required packages using npm:

```bash
npm install
```

This command will:
- Download and install all project dependencies
- Set up the Angular CLI and build tools
- Prepare the project for development

### 3. Start the Development Server
Run the application in development mode:

```bash
npm start
```

Or alternatively:
```bash
ng serve
```

The application will:
- Start the development server
- Open automatically in your browser at `http://localhost:4200`
- Auto-reload when you make changes to the code

### 4. View the Application
Once the server starts successfully, navigate to:
```
http://localhost:4200
```

You should see the Angular housing application running in your browser.

## Available Scripts

This project includes several useful npm scripts:

| Script | Command | Description |
|--------|---------|-------------|
| `npm start` | `ng serve` | Start development server |
| `npm run build` | `ng build` | Build the app for production |
| `npm run watch` | `ng build --watch --configuration development` | Build and watch for changes |
| `npm run ng` | `ng` | Run Angular CLI commands |

## Development Workflow

### Making Changes
1. Edit files in the `src/` directory
2. The development server will automatically reload
3. View changes in your browser

### Project Structure
```
src/
├── app/
│   ├── home/              # Home component
│   ├── housing-location/  # Housing location component
│   ├── app.ts            # Main app component
│   └── app.config.ts     # App configuration
├── assets/               # Static assets
├── index.html           # Main HTML file
└── styles.css           # Global styles
```

## Building for Production

To create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Testing

**Note**: Testing is currently disabled in this project configuration to focus on learning core Angular concepts.

### To Enable Testing (Optional)
If you want to add testing to your project:

1. Install testing dependencies:
   ```bash
   npm install --save-dev @angular/testing jasmine karma
   ```

2. Update `angular.json` to remove `skipTests: true` from schematics

3. Generate test files:
   ```bash
   ng generate component my-component --skip-tests=false
   ```

### Running Tests (When Enabled)
```bash
ng test          # Run unit tests
ng e2e           # Run end-to-end tests
```

## Troubleshooting

### Common Issues

**Port Already in Use**
If port 4200 is busy, Angular will suggest an alternative port. You can also specify a custom port:
```bash
ng serve --port 4201
```

**Permission Errors**
On macOS/Linux, if you encounter permission errors:
```bash
sudo npm install -g @angular/cli
```

**Build Errors**
If you encounter build errors, try:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Getting Help
- [Angular Documentation](https://angular.io/docs)
- [Angular CLI Reference](https://angular.io/cli)
- [Angular Tutorial](https://angular.io/tutorial)

## Learn More

This project is based on Angular's official tutorial. To learn more about Angular:

- Visit the [Angular Documentation](https://angular.io/docs)
- Complete the [Tour of Heroes Tutorial](https://angular.io/tutorial)
- Explore [Angular DevTools](https://angular.io/guide/devtools)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## License

This project is for educational purposes. Check the repository for license details.
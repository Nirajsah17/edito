class JsRuntime {
    constructor(options = {}) {
        this.options = options;
        this.init();
    }
  
    parseJavaScriptString(jsString) {
        // Use the Function constructor to create a new function from the provided string
        return new Function(jsString);
    }
  
    init() {
        // Initialize messages array
        this.messages = [];
        this.originalConsole = window.console;
        // Override console methods to capture messages
        let capturedConsole = {
            log: (...args) => this.captureMessage('log', args),
            error: (...args) => this.captureMessage('error', args),
            warn: (...args) => this.captureMessage('warn', args)
        };
  
        // Override console methods
        window.console = capturedConsole;
    }
  
    captureMessage(type, args) {
        // Capture console message along with type and timestamp
        this.messages.push({
            type: type,
            message: args.join(' '),
            timestamp: new Date()
        });
    }
  
    async run(rawCode) {
        if (!rawCode) return null;
  
        try {
            // Parse and execute the JavaScript code
            const code = this.parseJavaScriptString(rawCode);
            await code();
            window.console = this.originalConsole;
            // Return captured messages
            return await this.messages;
        } catch (error) {
            // Return error if code execution fails
            return error;
        }
    }
  }
  
  export { JsRuntime };
  
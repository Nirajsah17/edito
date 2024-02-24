class JsRuntime {
    constructor(options = {}) {
        this.options = options;
        // this.init();
    }
  
    parseJavaScriptString(jsString) {
        // Use the Function constructor to create a new function from the provided string
        return eval(jsString);
    }
  
    // init() {
    //     // Initialize messages array
    //     this.messages = [];
    //     this.originalConsole = window.console;
    //     // Override console methods to capture messages
    //     let capturedConsole = {
    //         log: (...args) => this.captureMessage('log', args),
    //         error: (...args) => this.captureMessage('error', args),
    //         warn: (...args) => this.captureMessage('warn', args)
    //     };
  
    //     // Override console methods
    //     window.console = capturedConsole;
    // }
  
    // captureMessage(type, args) {
    //     // Capture console message along with type and timestamp
    //     this.messages.push({
    //         type: type,
    //         message: args.join(' '),
    //         timestamp: new Date()
    //     });
    // }
  
    async run(rawCode) {
        if (!rawCode) return null;
       const execute = new Function(rawCode);
       const result = execute();
       const res = result === undefined ? result : result.toString();
       return res;
  }
}
  export { JsRuntime };
  
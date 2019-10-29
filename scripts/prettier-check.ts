import { runCheckOverChangedSpecFiles, logWarn, logError } from "./utils";

runCheckOverChangedSpecFiles({
  onCheckFile: (context, filePath) => {
    return context.exec(`prettier -c ${filePath}`);
  },

  onExecError: async (result) => {
    if (result.stdout) {
      console.log(result.stdout);
    }
  },

  onNotInCI: (context) => {
    logWarn("Not in CI environment. Run against all the spec json.");
    return context.exec(`prettier -c "specification/**/*.json"`);
  },

  onFinalFailed: async () => {
    logError('Code style issues found in the above file(s). Please run `npm install && npm run prettier -- --write "specification/<service>/**/*.json"` to fix.')
  }
})
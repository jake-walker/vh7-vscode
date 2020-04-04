import * as vscode from 'vscode';
import * as vh7 from './vh7';

export function activate(context: vscode.ExtensionContext) {
	let paste = vscode.commands.registerCommand('vh7-vscode.paste', () => {
        let editor = vscode.window.activeTextEditor;
        if (editor === undefined) {
            vscode.window.showErrorMessage("There is no active text editor.");
            return;
        }

        let language = editor.document.languageId;

        let selection = editor.selection;
        let content = editor.document.getText();
        if (!selection.isEmpty) {
            content = editor.document.getText(selection);
        }

        console.log("The content is", content);

        if (content.trim().length <= 0) {
            vscode.window.showWarningMessage("There is no text in the selection or file.");
            return;
        }

        vh7.paste(content, language).then((url) => {
            vscode.window.showInformationMessage(`Pasted selected code to ${url}!`);
        }).catch((error) => {
            var errorMessage = error.message || error;
            vscode.window.showErrorMessage(`An error ocurred when pasting the selected code. ${errorMessage}`);
        });
    });

    context.subscriptions.push(paste);
}

export function deactivate() {}

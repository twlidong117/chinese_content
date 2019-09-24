// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs such as the network by creating a UI which contains
// a full browser environment (see documentation).
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const selectedNodes = figma.currentPage.selection;
let node = null;
if (selectedNodes.length > 0 && selectedNodes.length < 2) {
    node = selectedNodes[0];
    if (node.type === 'TEXT' && !node.hasMissingFont) {
        figma.showUI(__html__);
    }
    else {
        figma.closePlugin('请选择一个文字节点或字体缺失');
    }
}
else {
    figma.closePlugin('请选择一个文字节点');
}
figma.ui.onmessage = (nums) => {
    loadFontNode(node, Number(nums));
};
function loadFontNode(node, nums) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield figma.loadFontAsync(node.fontName);
            const newStr = [];
            for (let i = 0; i < nums; i++) {
                newStr.push(String.fromCodePoint(Math.round(Math.random() * 20901) + 19968));
            }
            node.characters = newStr.join('');
            figma.closePlugin();
        }
        catch (error) {
            figma.closePlugin(error.toString());
        }
    });
}
// Make sure to close the plugin when you're done. Otherwise the plugin will
// keep running, which shows the cancel button at the bottom of the screen.
//figma.closePlugin();

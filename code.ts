// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs such as the network by creating a UI which contains
// a full browser environment (see documentation).

const selectedNodes = figma.currentPage.selection;
let node: SceneNode = null;
if (selectedNodes.length > 0 && selectedNodes.length < 2) {
    node = selectedNodes[0];
    if (node.type === 'TEXT' && !node.hasMissingFont) {
        figma.showUI(__html__);
    } else {
        figma.closePlugin('请选择一个文字节点或字体缺失')
    }
} else {
    figma.closePlugin('请选择一个文字节点')
}

figma.ui.onmessage = (nums) => {
    loadFontNode(<TextNode>node, Number(nums));
}

async function loadFontNode(node: TextNode, nums: number) {
    try {
        await figma.loadFontAsync(<FontName>node.fontName);
        const newStr: String[] = [];
        for (let i = 0; i < nums; i++) {
            newStr.push(String.fromCodePoint(Math.round(Math.random() * 20901) + 19968));
        }
        node.characters = newStr.join('');
        figma.closePlugin();
    } catch (error) {
        figma.closePlugin(error.toString());
    }
}


// Make sure to close the plugin when you're done. Otherwise the plugin will
// keep running, which shows the cancel button at the bottom of the screen.
//figma.closePlugin();

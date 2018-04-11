import $ from "jquery";

export const disableBrowerContextMenu = () => {
        $(document).bind("contextmenu", () => false);
    }

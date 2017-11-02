module.exports = function(a) {
    var a = {
        currentPage: a.currentPage,
        listContainerClass: "pagination",
        bootstrapMajorVersion: 3,
        totalPages: a.totalPages,
        numberOfPages: a.numberOfPages || 10,
        tooltipTitles: function (a, b) {
            switch (a) {
                case "first":
                    return "首页";
                case "prev":
                    return "上一页";
                case "next":
                    return "下一页";
                case "last":
                    return "尾页: " + this.totalPages;
                case "page":
                    return "第" + b + "页"
            }
        },
        itemTexts: function (a, b) {
            switch (a) {
                case "first":
                    return "首页";
                case "prev":
                    return "上一页";
                case "next":
                    return "下一页";
                case "last":
                    return "尾页: " + this.totalPages;
                case "page":
                    return b
            }
        },
        onPageClicked: a.onPageClicked
    };
    return a
}
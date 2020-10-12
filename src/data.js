const List = {
    list: [
      {
        id: 1,
        indent: 0,
        title: "Numbers",
      },
      {
        id: 2,
        indent: 1,
        title: "Count to determine",
      },
      {
        id: 3,
        indent: 2,
        title: "describe",
      },
      {
        id: 4,
        indent: 0,
        title: "Measurments",
      },

    ],
    getList: function () {
      return (
        (sessionStorage.getItem("theList") &&
          JSON.parse(sessionStorage.getItem("theList"))) ||
        this.list
      );
    },
    saveList: (list) => {
      sessionStorage.setItem("theList", JSON.stringify(list));
    },

  };
  
  export default List;
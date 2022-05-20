
    export function getboardgroupdata(){
        return[
            {
              id: "1",
              name: "分组一",
              show:true,
            },
            {
              id: "2",
              name: "分组二",
              show:true,
            },
          ]
    }
    export function getboardlist(){
        return [
            {
            name: "未开始",
            list: [
                { id: 1, name: "任务1", groupid: "1" },
                { id: 2, name: "任务2", groupid: "1" },
                { id: 3, name: "任务3", groupid: "2" },
                { id: 4, name: "任务4", groupid: "2" },
            ],
            },
            {
            name: "进行中",

            list: [
                { id: 5, name: "任务5", groupid: "1" },
                { id: 6, name: "任务6", groupid: "1" },
                { id: 7, name: "任务7", groupid: "2" },
                { id: 8, name: "任务8", groupid: "2" },
            ],
            },
            { list: [], name: "已完成" },
            { list: [], name: "已延期" },
            { list: [], name: "已关闭" },
        ]
    }

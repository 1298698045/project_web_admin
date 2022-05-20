
  
    export function getlistdata(){
        return {
            relates:[
                {
                    from:0,
                    to:1
                },{
                    from:0,
                    to:2
                },{
                    from:0,
                    to:3
                },
                {
                    from:0,
                    to:10
                },
            ],
            data: [
            {
            name: "未开始",
            show:false,
            number:0,
            showchart:true,
            left:100,
            backgroundcolor:'rgb(0, 82, 204)',
            width:200,
            list: [
                { number:1, id: 1, name: "任务1", groupid: "1" ,left:200,showchart:true,backgroundcolor:'rgb(0, 82, 204)',width:200},
                { number:2, id: 2, name: "任务2", groupid: "1" ,left:200,showchart:true,backgroundcolor:'rgb(0, 82, 204)',width:200},
                { number:3, id: 3, name: "任务3", groupid: "2" ,left:200,showchart:true,backgroundcolor:'rgb(0, 82, 204)',width:200},
                { number:4, id: 4, name: "任务4", groupid: "2" ,left:200,showchart:true,backgroundcolor:'rgb(0, 82, 204)',width:200},
            ],
            },
            {
            name: "进行中",
            show:false,
            number:5,
            showchart:true,
            left:400,
            backgroundcolor:'rgb(0, 82, 204)',
            width:200,
            list: [
                { number:6,id: 5, name: "任务5", groupid: "1" },
                { number:7,id: 6, name: "任务6", groupid: "1" },
                { number:8,id: 7, name: "任务7", groupid: "2" },
                { number:9,id: 8, name: "任务8", groupid: "2" },
            ],
            },
            { 
                number:10,list: [], name: "已完成",
                show:false,
                showchart:true,
                left:400,
                backgroundcolor:'rgb(0, 82, 204)',
                width:200,
            },
            { number:11,list: [], name: "已延期" },
            { number:12,list: [], name: "已关闭" },
        ]
    }
}

<template>
  <div>
    <boardhead
      class="container-head"
      :hiddenbread="true"
      :hiddendropdown="true"
      title="个人日报"
    >
      <template slot="rightbtn">
        <div class="filtercontainer">
          <div class="timeselect">
            <el-button
              @click="prevday"
              size="mini"
              icon="el-icon-arrow-left"
            ></el-button>
            <el-date-picker
              size="mini"
              v-model="time"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
            <el-button
              @click="nextday"
              size="mini"
              icon="el-icon-arrow-right"
            ></el-button>
          </div>
          <span>{{ username }}</span>
          <!-- <filteruser
            class="userselect"
            @search="userselect"
            :lookupall="true"
          /> -->
        </div>
      </template>
    </boardhead>
    <div class="main-container">

      <div class="usertree">
          <div class="tree-search">
            <el-input size="small" placeholder="输入关键字进行过滤" v-model="filterText"></el-input>

          </div>

        <el-tree
          class="filter-tree"
          :data="data"
          :props="defaultProps"
          :filter-node-method="filterNode"
          ref="tree"
          :highlight-current="true"
          @current-change="nodeselect"
          node-key="id"
        >
        </el-tree>
      </div>
      <el-table
        height="calc(100% - 30px)"
        @cell-mouse-enter="cellhover"
        :data="tableData"
        :span-method="objectSpanMethod"
        border
        style="width: 100%"
      >
        <el-table-column prop="TimeInterval" label="时间" width="100">
          <template slot-scope="scope">
            <div class="timecontainer el-table-text">
              <div>{{ scope.row.TimeInterval.textValue }}</div>
              <div
                class="addrow"
                v-if="
                  canedit && hoverrowindex == scope.row.TimeInterval.textValue
                "
                @click="addrow(scope.row, scope.$index)"
              >
                <i class="el-icon-circle-plus-outline"></i>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="TaskId" label="事务" min-width="150">
          <researchelselect
            v-if="canedit"
            slot-scope="scope"
            @change="
              (val) => {
                takchange(val, scope.row);
              }
            "
            :filterables="true"
            v-model="scope.row.TaskId.issueValue.id"
            :defaultdata="[
              {
                id: scope.row.TaskId.issueValue.id,
                name: scope.row.TaskId.issueValue.summary,
                iconUrl: scope.row.TaskId.issueValue.issueType.iconUrl,
              },
            ]"
            type="groups"
            method="IssueLookup"
            optionsize="size"
            name="TaskId"
          />
          <div v-else>
            <img
               v-if="scope.row.TaskId.issueValue.issueType.iconUrl"
              :src="
                '/static/img' + scope.row.TaskId.issueValue.issueType.iconUrl
              "
            />{{ scope.row.TaskId.issueValue.summary }}
          </div>
        </el-table-column>
        <el-table-column prop="TimeOriginalEstimate" label="预估时间" min-width="150">
          <template slot-scope="scope">
            <div class="el-table-text">
              {{ takentformat(scope.row.TimeOriginalEstimate.textValue) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="TimeSpent" label="用时" min-width="150">
          <template slot-scope="scope">
            <el-tooltip
              v-if="canedit"
              class="item"
              effect="dark"
              placement="bottom"
            >
              <div slot="content" class="tipsli">
                使用此格式：2w 4d 6h 45m<br />
                <ul>
                  <li>w = 周</li>
                  <li>d = 天</li>
                  <li>h = 小时</li>
                  <li>m = 分钟</li>
                </ul>
              </div>
              <el-input
                @change="celldatachange(scope.row)"
                @blur="scope.row.edit = false"
                v-if="scope.row.edit"
                :class="{
                  error:
                    scope.row.TimeSpent.textValue &&
                    scope.row.TimeSpent.textValue != '' &&
                    !scope.row.takentimerule,
                }"
                placeholder="请输入"
                @input="
                  takentimechange(
                    scope.row.TimeTracking.textValue,
                    scope.row.TimeSpent.textValue,
                    scope.row.oldTimeSpent,
                    scope.row.oldTimeTracking,
                    scope.row
                  )
                "
                v-model="scope.row.TimeSpent.textValue"
              ></el-input>
              <el-input
                @focus="$set(scope.row, 'edit', true)"
                v-else
                :value="takentformat(scope.row.TimeSpent.textValue)"
                placeholder="请输入"
              ></el-input>
            </el-tooltip>
            <div v-else>{{ takentformat(scope.row.TimeSpent.textValue) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="TimeTracking" label="累计用时" min-width="150">
          <template slot-scope="scope">
            <div class="el-table-text">
              {{ takentformat(scope.row.TimeTracking.textValue) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="Comment" label="描述" min-width="200">
          <template slot-scope="scope">
            <div>
              <el-input
                @change="celldatachange(scope.row)"
                v-model="scope.row.Comment.textValue"
              >
              </el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="75">
          <template slot-scope="scope">
            <div class="el-table-text">
              <el-button
                v-if="canedit"
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import boardhead from "@/components/head/boardhead.vue";
import filteruser from "@/components/filteruser.vue";
import researchelselect from "@/components/dropbtn/researchelselect.vue";
import { takentimechange, takentformat } from "@/utils/formatdate.js";
import commonapi from "@/api/commonapi";
import { WorklogListViewItems, WorklogEdit } from "@/api/projectapi.js";

export default {
  data() {
    return {
      canedit: false,
      username: "",
      userid: "",
      hoverrowindex: false,
      time: "",
      tableData: [],
      filterText: "",
      selecttreeid:null,
      data: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
    };
  },
  watch: {
    time() {
      this.getdata();
    },
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  components: {
    boardhead,
    filteruser,
    researchelselect,
  },
  created() {
    // this.getdata()
    this.time = new Date().toLocaleDateString().split("/").join("-");
    this.gettreedata()
  },
  methods: {
    gettreedata(){
        commonapi.subordinatetree().then(res=>{
            this.data = res.returnValue
        })
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    takentformat(val) {
      return takentformat(val);
    },
    getdata() {
      let filterquert = "WorkDate\teq\t" + this.time;
      if (this.userid != "") {
        filterquert += "\nOwningUser\teq\t" + this.userid;
      } else {
        filterquert += "\nOwningUser\teq-userid";
      }
      if (
        this.userid == "" &&
        new Date(this.time).getTime() ==
          new Date(new Date().toLocaleDateString()).getTime()
      ) {
        this.canedit = true;
      } else {
        this.canedit = false;
      }
      const timearr = [
        "9-10",
        "10-11",
        "11-12",
        "13-14",
        "14-15",
        "15-16",
        "16-17",
        "17-18",
        "19-20",
        "20-21",
      ];

      WorklogListViewItems(filterquert).then((res) => {
        let list = res.data.list.nodes;
        list.forEach((listitem) => {
          listitem.fields.forEach((field) => {
            listitem[field.fieldKey] = field;
          });
          listitem.oldTimeSpent = listitem.TimeSpent.textValue;
          listitem.oldTimeTracking = listitem.TimeTracking.textValue;
          listitem.takentimerule = true;
        });
        let dataarr = [];
        timearr.forEach((item) => {
          const arr = list.filter((listitem) => {
            return listitem.TimeInterval.textValue == item;
          });
          if (arr.length > 0) {
            arr[0].rowspan = arr.length;
            console.log(arr);
            dataarr = Array.concat(dataarr, arr);
          } else {
            dataarr.push({
              TimeInterval: { textValue: item },
              TaskId: { issueValue: { issueType: {} } },
              TimeOriginalEstimate: {},
              TimeSpent: {},
              TimeTracking: {},
              Comment: {},
              rowspan: 1,
            });
          }
        });
        this.tableData = [];
        this.$nextTick(() => {
          this.tableData = dataarr;
        });
      });
    },
    takentimechange(
      TimeTracking,
      TimeSpent,
      oldTimeSpent,
      oldTimeTracking,
      row
    ) {
      const ntime = takentimechange(
        TimeSpent,
        oldTimeTracking,
        oldTimeSpent,
        "add"
      );
      if (ntime.rule) {
        row.takentimerule = true;
        row.TimeTracking.textValue = ntime.newtakentime;
      } else {
        row.takentimerule = false;
        row.TimeTracking.textValue = oldTimeTracking;
      }
    },
    takchange(val, row) {
      this.celldatachange(row);
    },
    celldatachange(row) {
      row.TimeSpent.textValue = takentimechange(row.TimeSpent.textValue);
      commonapi.entitysaverecord(
        {
          TaskId: { Id: row.TaskId.issueValue.id },
          WorkDate: this.time,
          TimeSpent: row.TimeSpent.textValue,
          TimeInterval: row.TimeInterval.textValue,
          Comment: row.Comment.textValue,
          TimeTracking: row.TimeTracking.textValue,
        },
        "4203",
        row.id
      );
    },
    userselect(id, name) {
      this.username = name;
      this.userid = id;
      this.getdata();
    },
    addrow(row, index) {
      row.rowspan++;
      this.tableData.splice(index + row.rowspan - 1, 0, {
        TimeInterval: { textValue: row.TimeInterval.textValue },
        TaskId: { issueValue: { issueType: {} } },
        TimeOriginalEstimate: {},
        TimeSpent: {},
        TimeTracking: {},
        Comment: {},
        rowspan: 0,
      });
    },
    handleSave() {},
    handleDelete(index, row) {
      commonapi.entitydelete(4203, row.id).then(() => {
        this.getdata();
      });
    },
    cellhover(row) {
      this.hoverrowindex = row.TimeInterval.textValue;
    },
    prevday() {
      this.time = new Date(new Date(this.time).getTime() - 1000 * 60 * 60 * 24)
        .toLocaleDateString()
        .split("/")
        .join("-");
    },
    nextday() {
      this.time = new Date(new Date(this.time).getTime() + 1000 * 60 * 60 * 24)
        .toLocaleDateString()
        .split("/")
        .join("-");
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return {
          rowspan: row.rowspan ? row.rowspan : 0,
          colspan: 1,
        };
      }
    },
    nodeselect(val){
        console.log(val)
        const node =  this.$refs.tree.getCurrentNode()
        if(node.children.length>0||this.selecttreeid==val.id){
            this.$refs.tree.setCurrentKey(null)
            this.selecttreeid = null
            this.username = '';
            this.userid = '';
            this.getdata();
        }else{
            this.selecttreeid = val.id
            this.username = val.name;
            this.userid = val.id;
            this.getdata();
        }
    }
  },
};
</script>
<style scoped>
.main-container {
  height: calc(100vh - 135px);
  padding: 15px 40px;
  display: flex;
}
.container-head >>> .head-operate {
  flex: 1;
}
.timeselect >>> .el-button {
  border: 0;
  font-size: 20px;
  font-weight: 700;
  padding: 5px;
}
.timeselect >>> .el-input {
  width: 145px;
}
.timeselect >>> .el-input__inner {
  border: 0;
  font-size: 16px;
}
.timeselect >>> .el-input__prefix,
.timeselect >>> .el-input__suffix {
  display: none;
}
.timeselect {
  display: flex;
  align-items: center;
  margin-right: 30px;
}
.timecontainer {
  display: flex;
  justify-content: space-between;
}
.addrow:hover {
  cursor: pointer;
  color: #108def;
}
.filtercontainer {
  display: flex;
  flex: 1;
  align-items: center;
}
.head-container >>> .head-name {
  width: calc(50% - 100px);
}
.el-table >>> .el-table__cell {
  padding: 0;
}
.el-table >>> .el-table__header .el-table__cell {
  padding: 10px !important;
}
.el-table >>> .cell {
  padding: 0 !important;
}
.el-table >>> .el-table__body-wrapper .el-table__cell {
  height: 41px;
}
.el-table >>> .el-input__inner {
  border-width: 0;
  background-color: transparent;
}
.el-table >>> .is-focus .el-input__inner {
  border-width: 2px;
}
.el-table >>> .el-input__inner:focus {
  border-width: 2px;
}
.el-table .el-table-text {
  padding: 0 10px !important;
}
.error >>> .el-input__inner {
  border: 2px solid rgb(222, 53, 11) !important;
}
.a {
  position: absolute;
  top: 150px;
  width: 500px;
  height: 200px;
  background-color: red;
  z-index: 9999;
  padding: 50px;
}
.usertree{
    margin-right: 20px;
    width: 180px;
}
.tree-search{
    margin-bottom: 10px;
}
</style>
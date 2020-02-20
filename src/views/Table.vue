<template>
  <div class="Table">
    <EditTools
      :can-add="true"
      @_add="addRecord(pointer.y)"
      :can-delete="pointer.y !== null"
      @_delete="deleteRecord(pointer.y)"
      :can-export="true"
      @_export="exportRecords()"
      :can-import="true"
    ></EditTools>

    <h2>{{ year }}年{{ month }}月の金銭出納表</h2>

    <div class="content">
      <table>
        <tr class="header">
          <th class="date" :class="{ emphasized: pointer.x === 0 }">日付</th>
          <th class="type" :class="{ emphasized: pointer.x === 1 }">相手科目</th>
          <th class="detail" :class="{ emphasized: pointer.x === 2 }">摘要</th>
          <th class="amount-received" :class="{ emphasized: pointer.x === 3 }">入金額</th>
          <th class="amount-invested" :class="{ emphasized: pointer.x === 4 }">出金額</th>
          <th class="balance">残高</th>
        </tr>

        <tr
          v-for="(record, index) in records"
          :key="record.id"
          class="record"
          v-show="records.length !== 0"
          :ref="[ record.id ]"
          @focusin="setPointer({ y: index })"
          @focusout="setPointer({ x: null, y: null })"
        >
          <td class="has-field date" @focusin="setPointer({ x: 0 })" :tabindex="0">
            <DigitField
              :default-value="record.date.day"
              :min-value="1"
              :max-value="31"
              @_change="event => {
                record.date.day = event;
                focusOn(record);
              }"
              @_up="setPointer({ y: pointer.y - 1 })"
              @_down="setPointer({ y: pointer.y + 1 })"
            ></DigitField>
          </td>

          <td class="has-field type" @focusin="setPointer({ x: 1 })" :tabindex="0">
            <TextField
              :default-value="record.type"
              @_change="record.type = $event"
              @_up="setPointer({ y: pointer.y - 1 })"
              @_down="setPointer({ y: pointer.y + 1 })"
            ></TextField>
          </td>

          <td class="has-field detail" @focusin="setPointer({ x: 2 })" :tabindex="0">
            <TextField
              :default-value="record.detail"
              @_change="record.detail = $event"
              @_up="setPointer({ y: pointer.y - 1 })"
              @_down="setPointer({ y: pointer.y + 1 })"
            ></TextField>
          </td>

          <td class="has-field amount-received" @focusin="setPointer({ x: 3 })" :tabindex="0">
            <DigitField
              :default-value="record.amountReceived"
              :min-value="0"
              do-emit-before-committing
              @_change="record.amountReceived = $event"
              @_up="setPointer({ y: pointer.y - 1 })"
              @_down="setPointer({ y: pointer.y + 1 })"
            ></DigitField>
          </td>

          <td class="has-field amount-invested" @focusin="setPointer({ x: 4 })" :tabindex="0">
            <DigitField
              :default-value="record.amountInvested"
              :min-value="0"
              do-emit-before-committing
              @_change="record.amountInvested = $event"
              @_up="setPointer({ y: pointer.y - 1 })"
              @_down="setPointer({ y: pointer.y + 1 })"
            ></DigitField>
          </td>

          <td class="balance">{{ getBalance(index) }}</td>
        </tr>

        <tr class="footer" v-if="records.length !== 0">
          <th>
            <span tabindex="0" @focus="addRecord()"></span>
            合計
          </th>

          <th></th>

          <th></th>

          <th>{{ sumOfAmountReceived }}</th>

          <th>{{ sumOfAmountInvested }}</th>

          <th>{{ sumOfBalance }}</th>
        </tr>
      </table>

      <p
        class="message-no-records"
        v-if="records.length === 0"
      >この表には行がありません。上のツール バーの [追加] をクリックして行を追加できます。</p>
    </div>

    <TableSwitchBar></TableSwitchBar>
  </div>
</template>

<script>
import TextField from '@/components/TextField'
import DigitField from '@/components/DigitField'
import EditTools from '@/components/EditTools'
import TableSwitchBar from '@/components/TableSwitchBar'
import { setTimeout } from 'timers'

export default {
  data () {
    return {
      pointer: {
        x: null,
        y: null
      }
    }
  },
  computed: {
    year () {
      return Number(this.$route.params.year)
    },
    month () {
      return Number(this.$route.params.month)
    },
    records () {
      var records = this.$store.getters.getRecordsByYearAndMonth(
        this.year,
        this.month
      )

      return records
    },
    sumOfAmountInvested () {
      const records = this.records
      let result = 0

      records.forEach(record => {
        result += record.amountInvested
      })

      return result.toLocaleString()
    },
    sumOfAmountReceived () {
      const records = this.records
      let result = 0

      records.forEach(record => {
        result += record.amountReceived
      })

      return result.toLocaleString()
    },
    sumOfBalance () {
      return this.getBalance()
    },
    lastRecord () {
      return this.records.slice(0).reverse()[0] || null
    }
  },
  components: {
    TextField,
    DigitField,
    EditTools,
    TableSwitchBar
  },
  methods: {
    setPointer ({ x = this.pointer.x, y = this.pointer.y }) {
      const self = this
      self.pointer.x = x
      self.pointer.y = y

      const focus = record => {
        const id = record.id
        const el = self.$refs[id][0]
        el.querySelectorAll('.Field')[x].focus()
      }

      if (x < 0 || y < 0) {
        if (self.records.length > 0) {
          self.setPointer({ y: 0 })
        } else {
          self.setPointer({ x: null, y: null })
        }
        return
      }

      const record = self.records[y]

      if (x !== null && y !== null) {
        if (record) {
          focus(record)
        } else {
          this.addRecord().then(record => {
            focus(record)
          })
        }
      } else {
      }
    },
    focusOn (record) {
      const self = this

      setTimeout(function () {
        const id = record.id
        const el = self.$refs[id][0]
        const records = self.$el.querySelectorAll('.record')
        records.forEach((record, index) => {
          if (record === el) {
            self.setPointer({
              x: self.pointer.x || 0,
              y: index
            })
          }
        })
      }, 0)
    },
    addRecord (y = null) {
      const date = {
        year: this.year,
        month: this.month
      }

      const records = this.records

      if (y !== null) {
        const record = records[y]
        date.day = record.date.day
      } else {
        const lastRecord = this.lastRecord
        if (lastRecord) {
          date.day = lastRecord.date.day
        } else {
          date.day = 1
        }
      }

      const self = this

      return this.$store.dispatch('addRecord', { date }).then(record => {
        const el = self.$refs[record.id][0]
        el.scrollIntoView({
          behavior: 'auto',
          block: 'center',
          inline: 'center'
        })
        self.focusOn(record)
        return record
      })
    },
    deleteRecord (row) {
      const record = this.records[row]
      const self = this
      const targetIsLastRecord = self.lastRecord === record

      return this.$store.dispatch('deleteRecord', record.id).then(() => {
        if (targetIsLastRecord) {
          self.setPointer({ y: self.pointer.y - 1 })
        } else {
          self.setPointer({ y: self.pointer.y })
        }
      })
    },
    exportRecords () {
      const records = this.$store.getters.records
      const json = JSON.stringify(records)
      const uri = 'data:application/json;charset=utf-8,' + encodeURI(json)
      const el = document.createElement('a')
      el.href = uri
      el.download = `${Date.now()}.json`
      document.body.appendChild(el)
      el.click()
      el.remove()
    },
    importRecords () {},
    /*
    exportTable() {
      let csv = this.$store.getters.getTableByYearAndMonthInCsv(
        this.year,
        this.month
      );
      let encodedUri = encodeURI(csv);
      let el = document.createElement("a");
      el.href = encodedUri;
      el.download = `${this.year}年${this.month}月の金銭出納表.csv`;
      document.body.appendChild(el);
      el.click();
      el.remove();
    },
    */
    getBalance (index) {
      let records = null
      if (index !== undefined) {
        records = this.records.slice(0, index + 1)
      } else {
        records = this.records
      }
      const amounts = []
      let result = 0

      for (const i in records) {
        const record = records[i]
        let amount = 0
        amount += record.amountReceived
        amount += record.amountInvested * -1
        amounts.push(amount)
      }

      amounts.forEach(amount => {
        result += amount
      })

      return result.toLocaleString()
    }
  }
}
</script>

<style scoped lang="stylus">
.Table {
  padding: 4px 12px;
  width: 984px;
  max-width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}

h2 {
  margin: 8px 0;
  font-size: 15px;
}

.content {
  table-layout: fixed;
  width: 100%;
  box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.4);
  margin: 8px 0;
}

.header {
  border-bottom: 1px solid #ccc;
}

th {
  background: #fff;
  padding: 8px;

  &.emphasized {
    font-weight: bold;
  }
}

.type {
  width: 12%;
}

.date, .amount-received, .amount-invested, .balance {
  width: 8%;
}

td {
  padding: 8px;

  & input {
    text-align: center;
    width: 100%;
  }

  &.has-field {
    cursor: text;
  }

  &.date, &.type, &.amount-invested, &.amount-received, &.balance {
    text-align: center;
  }
}

.footer {
  th {
    border-top: 1px solid #ccc;
    background: #eee;
  }
}

.record {
  background: #f8f8f8;

  &:hover {
    background: #eee;
  }

  &:focus-within {
    background: #fff;
    outline: 3px solid #4d90fe;
  }
}

.message-no-records {
  padding: 48px 5%;
  display: flex;
  justify-content: center;
  background: #f8f8f8;
}
</style>

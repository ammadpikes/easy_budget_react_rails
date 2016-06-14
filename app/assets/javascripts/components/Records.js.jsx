var Records = React.createClass({
  getInitialState: function () {
      return {records: this.props.data}
  },
  getDefaultProps: function () {
      return {records: []}
  },
  addRecord: function (record) {
    var records = React.addons.update(this.state.records, { $push: [record] })
    this.setState({ records: records })
  },
  updateRecord: function (record, data) {
    var index = this.state.records.indexOf(record)
    var records = React.addons.update(this.state.records,
                                      { $splice: [[index, 1, data]] })
    this.replaceState({ records: records })
  },
  deleteRecord: function (record) {
    var index = this.state.records.indexOf(record)
    var records = React.addons.update(this.state.records,
                                      { $splice: [[index, 1]] })
    this.replaceState({ records: records })
  },
  credits: function () {
    var credits = this.state.records.filter(function (val) {
      return val.amount >= 0
    })
    return credits.reduce(function (prev, curr) {
      return prev + parseFloat(curr.amount)
    }, 0)
  },

  debits: function () {
    var debits = this.state.records.filter(function (val) {
      return val.amount < 0
    })
    return debits.reduce(function (prev, curr) {
      return prev + parseFloat(curr.amount)
    }, 0)
  },

  balance: function () {
    return this.debits() + this.credits()
  },

  render: function () {
      var global_this = this;
      return(
      <div className="records">
        <h2 className="title well text-center">
          Easy Budgeting!
        </h2>
        <div className="addRecords text-center">
        <div className="row no-margin">
          <AmountBox type="success" amount={this.credits()} text="Credit" />
          <AmountBox type="danger" amount={this.debits()} text="Debit" />
          <AmountBox type="info" amount={this.balance()} text="Balance" />
        </div>
          <RecordForm handleNewRecord={this.addRecord} />
        </div>
        <table className="table table-bordered margin-top-20">
          <thead>
            <tr>
              <th className="text-center">Date</th>
              <th className="text-center">Title</th>
              <th className="text-center">Amount</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>

          {this.state.records.map(function(record) {
              return <Record key={record.id} record={record}
              handleDeleteRecord={global_this.deleteRecord}
              handleEditRecord={global_this.updateRecord} />
            }.bind())}
          </tbody>
        </table>
      </div>
    );
  }
})

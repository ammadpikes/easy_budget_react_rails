var Record = React.createClass({
  getInitialState: function () {
    return { edit: false }
  },
  handleToggle: function (e) {
    e.preventDefault()
    this.setState({ edit: !this.state.edit })
  },
  handleEdit: function (e) {
    e.preventDefault()
    var data = { title: ReactDOM.findDOMNode(this.refs.title).value,
                 date: ReactDOM.findDOMNode(this.refs.date).value,
                 amount: ReactDOM.findDOMNode(this.refs.amount).value }
    $.ajax({
      method: 'PUT',
      url: '/records/' + this.props.record.id,
      dataType: 'JSON',
      data: { record: data },
      success: function (data) {
        this.setState({ edit: false })
        this.props.handleEditRecord(this.props.record, data)
      }.bind(this)
    })
  },
  handleDelete: function (e) {
    $.ajax({
      method: 'DELETE',
      url: '/records/' + this.props.record.id,
      dataType: 'JSON',
      success: function () {
        this.props.handleDeleteRecord(this.props.record)
      }.bind(this)
    })
  },
  recordRow: function () {
    return(
      <tr>
        <td className="text-center">{this.props.record.date}</td>
        <td className="text-center">{this.props.record.title}</td>
        <td className="text-center">{amountFormatter(this.props.record.amount)}</td>
        <td className="text-center">
          <a className="btn btn-default margin-right-10" onClick={this.handleToggle}>
            Edit
          </a>
          <a className="btn btn-danger" onClick={this.handleDelete}>
            Delete
          </a>
        </td>
      </tr>
    );
  },
  recordForm: function () {
    return (
      <tr>
        <td className="text-center">
          <input className="form-control" type="text"
                 defaultValue={this.props.record.date} ref="date">
          </input>
        </td>
        <td className="text-center">
          <input className="form-control" type="text"
                 defaultValue={this.props.record.title} ref="title">
          </input>
        </td>
        <td className="text-center">
          <input className="form-control" type="number"
                 defaultValue={this.props.record.amount} ref="amount">
          </input>
        </td>
        <td className="text-center">
          <a className="btn btn-default margin-right-10" onClick={this.handleEdit}>
            Update
          </a>
          <a className="btn btn-danger" onClick={this.handleToggle}>
            Cancel
          </a>
        </td>
      </tr>
    )
  },
  renderedRecord: function () {
    if (this.state.edit === true) {
      return this.recordForm()
    } else {
      return this.recordRow()
    }
  },
  render: function () {
      return (this.renderedRecord())
  }
})

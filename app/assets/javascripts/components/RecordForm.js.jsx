var RecordForm = React.createClass({
  getInitialState: function() {
    return { title: '',
             date: '',
             amount: '' }
  },

  handleChange: function(e) {
    var name = e.target.name;
    var obj = {};
    obj[name] = e.target.value;
    this.setState(obj);
  },

  valid: function() {
    return (this.state.title && this.state.date && this.state.amount);
  },

  handleSubmit: function(e) {
    e.preventDefault();
    $.post('',
           { record: this.state },
           function(data) {
             this.props.handleNewRecord(data);
             this.setState(this.getInitialState());
           }.bind(this),
           'JSON'
    );
  },

  render: function() {
    return(
      <div>
        <form className='form-inline' onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <input type='date' className='form-control margin-right-10'
                   placeholder='Date' name='date'
                   value={this.state.date} onChange={this.handleChange}>
            </input>
          </div>
          <div className='form-group'>
            <input type='text' className='form-control margin-right-10'
                   placeholder='Title' name='title'
                   value={this.state.title} onChange={this.handleChange}>
            </input>
          </div>
          <div className='form-group'>
            <input type='number' className='form-control margin-right-10'
                   placeholder='Amount' name='amount'
                   value={this.state.amount} onChange={this.handleChange}>
            </input>
          </div>
          <div className='form-group'>
            <input type='submit' className='btn btn-primary'
                   disabled={!this.valid()}>
            </input>
          </div>
        </form>
        <div className="claim">
        * Please Enter Negative - value for Debit amount.  
        </div>
      </div>
    )
  }
});

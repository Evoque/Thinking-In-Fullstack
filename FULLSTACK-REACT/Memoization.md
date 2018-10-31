
```javascript

import memoize from "memoiza-one";

class Example extends Component {
  
  state = { filterText: '' },
  
  // Re-run the filter whenever the list array of filter text changes;
  filter = memoize(
    (list, filterText) => list.filter(item => item.text.includes(filterText))
  );
  
  handleChange = event => {
    this.setState({ filterText: event.target.value });
  };
  
  render() {
  
    // Calculate the latest filtered list. If these arguments haven't changed 
    // since the last render, `memoize-one` will reuse the last return value.
    const filteredList = =this.filter(this.props.list, this.state.filterText);
    
    return (
      <Fragment>
         <input />
         <url></ul>
      </Fragment>
    )
  }
  
}

```

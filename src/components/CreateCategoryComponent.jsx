import React, { Component } from 'react';
import Select from 'react-select';

const options = [
  { value: 1, label: 'Chocolate' },
  { value: 2, label: 'Strawberry' },
  { value: 3, label: 'Vanilla' },
  { value: 4, label: 'Medicine' }
]

class CreateCategoryComponent extends Component {
    constructor(props) {
        super(props)
        this.state={ category: this.props.category}
        console.log("category is "+this.state.category)
      }
    
    render() {
        return (
            <div>
                <Select value={options.value}
                        options={options}
                        selectedValue={this.state.category}
                         />
            </div>
        );
    }
}


export default CreateCategoryComponent;

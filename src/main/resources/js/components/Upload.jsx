import React from 'react';
import ReactDOM from 'react-dom';

const Upload = React.createClass({
	
	
	fotoChange(e){
		  var reader = new FileReader();
		  var t = this;
		  reader.onload = function (e) {
			  // get loaded data and render thumbnail.
			  ReactDOM.findDOMNode(t.refs.image).src = this.result;
			  t.props.onFileChamge(this.result)
			};
		  // read the image file as a data URL.
	      reader.readAsDataURL(ReactDOM.findDOMNode(this.refs.input).files[0]);
	  },
	
	  
	  getFile(){
		  return ReactDOM.findDOMNode(this.refs.input).files[0];
	  }, 
	  
	render(){
		let style = {
				imgst: {
					maxHeight: "100px",
					maxWidth: "100px"
				}
		}
		return (
				<span>
					<input ref='input' type="file"  onChange={this.fotoChange} /> 
			      	<img ref='image' style={style.imgst} />
		      	</span>
		)
	}
	
});


export default Upload;
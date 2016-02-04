import React from 'react';
import ReactDOM from 'react-dom';
import FlatButton from 'material-ui/lib/flat-button';

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
	  
	  openFileChange(){
		ReactDOM.findDOMNode(this.refs.input).click();
	  },
	render(){
		let style = {
				imgst: {
					maxHeight: "100px",
					maxWidth: "100px"
				},
				imgimp: {
					display: "none"
				}

		}

		return (
				<span>
					<FlatButton 
			      	onTouchTap={this.openFileChange} 
			      	label="Selecionar Arquivo" 
			      	primary={true} />
						<input style={style.imgimp} ref='input' type="file"  onChange={this.fotoChange} /> 
			      	<img ref='image' style={style.imgst} />
		      	</span>
		)
	}
	
});


export default Upload;
import React from 'react';
import {Row, Col, Container, Button, Image, Spinner,Alert, Badge} from 'react-bootstrap'
import './App.css'
import Img from './undraw_baby.png'
import AI from './AI.png'
import axios from 'axios';


let url = 'https://fetus-classification-api.herokuapp.com/predict'
let predictions = ["Normal",  "Suspect",  "Pathological"]




function NavigationBar(){
  return(
    <> 
    <div className='flex-center' style={{backgroundColor:'#000000', color:'#bd2130', minHeight:'50px', fontSize:'25px', textAlign:'center'}}>
    <span>Fetal Heath Classifier</span>
    </div>  
    </>
  )
}

function About(){
  return(
    <> 

  <div>
    <Container>
   <Row>
   <Col style={{'textAlign':'center', fontSize:'30px'}} xs={12} sm={12} md={12} lg={12} > 
   Know how our <span style={{color:'#bd2130'}} >AI</span> model Predicts
   </Col>

   <Col style={{'textAlign':'justify',  fontSize:'17px', padding:'20px'}} xs={{span:12, order:2}} sm={{span:12, order:2}} md={{span:6, order:1}} lg={{span:6, order:1}} > 
    Our model has been trained on a data set available on <a href='https://www.kaggle.com/andrewmvd/fetal-health-classification'>Kaggle</a>.
    The dataset contains 2126 records of features extracted from Cardiotocogram exams, which were then classified by three expert obstetritians into 3 classes: Normal, Suspect and Pathological.
    You can classify fetal health in order to prevent child and maternal mortality.
    <p>
    We trained multiple models from <a href="https://scikit-learn.org/stable/">scikit-learn</a> like&nbsp;
    <Badge style={{padding:'6px'}} pill variant="primary">MLPClassifier </Badge> &nbsp;
    <Badge style={{padding:'6px'}} pill variant="success">KNeighborsClassifier </Badge> &nbsp;
    <Badge style={{padding:'6px'}} pill variant="info">KNeighborsClassifier </Badge>&nbsp;
    <Badge style={{padding:'6px'}} pill variant="warning">OneVsRestClassifier </Badge>&nbsp;
    <Badge style={{padding:'6px'}} pill variant="secondary">GaussianNB </Badge>&nbsp;
    <Badge style={{padding:'6px'}} pill variant="dark">GaussianProcessClassifier </Badge>&nbsp;
    
    <Badge style={{padding:'6px'}} pill variant="primary">DecisionTreeClassifier </Badge>&nbsp;
    <Badge style={{padding:'6px'}} pill variant="success">QuadraticDiscriminantAnalysis </Badge>&nbsp; among all the 
    models <Badge style={{padding:'6px'}} pill variant="danger">Random forest classifier </Badge>&nbsp;  had the maximum accuracy of 92.5% that is what powers this app.
    you can check the code for <a href='https://github.com/hadimir22/fetus-health-classifier' >ML model</a>, <a href='https://github.com/hadimir22/fetus-health-classifier-ui'>UI</a> and <a href='https://github.com/hadimir22/fetus-health-api' >API</a>. Dont forget to give a  &#9733;	


    </p>
   </Col>

   <Col className='flex-center' xs={{span:12, order:1}} sm={{span:12, order:1}} md={{span:6, order:2}} lg={{span:6, order:2}} > 
   <div >
    <Image src={AI} fluid />
    </div>
   </Col>

   </Row>
   </Container>
   </div>
    </>
  )
}


class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      showMain: true,
      loading: false,
      btnDisabled: true,
      result: null, 
      variant:null,
      fetus: '',
      FHR: null,
      ACC: null,
      fetalMovements: null,
      utereneCont: null,
      lightDec: null,
      severeDec: null,
      prolonedDec: null,
      percentSTR: null,
      meanSTV: null,
      percentLTR: null,
      meanLTV: null,    
    };
  }

  clear = () => {
    this.setState({
      showMain: true,
      loading: false,
      btnDisabled: true,
      result: null, 
      variant:null,
      fetus: '',
      FHR: null,
      ACC: null,
      fetalMovements: null,
      utereneCont: null,
      lightDec: null,
      severeDec: null,
      prolonedDec: null,
      percentSTR: null,
      meanSTV: null,
      percentLTR: null,
      meanLTV: null, 
    })
  }

  validate =  (e) => {
    this.setState({ FHR: parseFloat(e.target.value)}, () => {
      if (this.state.FHR === 0 || isNaN(this.state.FHR)){
        this.setState({btnDisabled: true})
      }else {
        
        this.setState({btnDisabled: false})
      }
      console.log(this.state.FHR, this.state.btnDisabled)

    })

    
  }

  handlePredict = (e) =>{
    e.preventDefault()
    this.setState({loading:true, showMain:false})
    const  {FHR, ACC, fetalMovements, utereneCont, lightDec, severeDec, prolonedDec, percentSTR, meanSTV, percentLTR, meanLTV }  = this.state
    let features = [
      FHR?FHR:0, ACC?ACC:0, fetalMovements?fetalMovements:0,utereneCont?utereneCont:0, 
      lightDec?lightDec:0, severeDec?severeDec:0, prolonedDec?prolonedDec:0, percentSTR?percentSTR:0,
      meanSTV?meanSTV:0, percentLTR?percentLTR:0, meanLTV?meanLTV:0
      ] 

    axios.post(url, {
       features 
    })
    .then((response) => {
      console.log(response.data.predictions);
      let max = Math.max(...response.data.predictions)
      let index = response.data.predictions.indexOf(max)
      let fetus = predictions[index] 
      let variant = ''
      if (fetus === 'Normal'){ variant = 'success'}
      else if (fetus === 'Suspect'){ variant = 'warning'}
      else { variant = 'danger'}
      this.setState({result: max, fetus:fetus, variant:variant, loading:false}, () =>{
        // console.log(this.state)
      })

    })
    .catch((error) => {
      console.log(error);
      alert('something went wrong! please try again')
      this.clear()
    });

  }

  render(){
    return(
      <>
      <NavigationBar/>
     
      <div className='main' >
      
     { this.state.loading 
     &&  (<Container style={{padding:'20px'}}>
          <Row>
            <Col className='flex-center' xs={12} sm={12} md={12} lg={12}>
            <Spinner animation="border" size='lg' variant="danger" />
            
            </Col>
            <Col className='flex-center' xs={12} sm={12} md={12} lg={12}>
             
            Hold tight! prediction in progress
            </Col>
          </Row>
        </Container>
        )}

        {this.state.result && (
          <Container>
            <Row>
            <Col className='flex-center' xs={12} sm={12} md={12} lg={12}>
            <Alert   variant={this.state.variant}>
              <p> The Model has predicted that probability of your fetus being <span  style={{color:'#bd2130'}} > {this.state.fetus} </span>
               is <span  style={{color:'#bd2130'}} > {this.state.result } </span> </p>
              </Alert>
              </Col>
              <Col className='form' xs={12} sm={12} md={12} lg={12}>
         <Button variant="danger" size='lg' onClick={() => this.clear()} >Predict another</Button>
         </Col>

         <Col className='form' xs={12} sm={12} md={12} lg={12}>
         Don't forget to consult your doctor. Happy parenting!
         </Col>

            </Row>
          
          </Container>
        )}


  { this.state.showMain &&
   (  
       <Container>
        <Row>
      
      
        <Col style={{'textAlign':'center'}} xs={12} sm={12} md={12} lg={12} > 
        Check what <span style={{color:'#bd2130'}} >AI</span> has to says about your fetal health
        <p style={{fontSize:'15px'}} >
          Our model can classify the health of a fetus as Normal, Suspect or Pathological 
         </p>
        </Col>
     
        <Col className='flex-center' xs={12} sm={12} md={12} lg={12} > 
        <div className="image">
         <Image src={Img} fluid />
         </div>
        </Col>
        
        </Row>
       <Row  style={{marginTop:'0px'}}>
       <Col xs={12} sm={12} md={12} lg={12} style={{paddingLeft:'40px', fontSize:'small'}} >
         All inputs should be numeric 
         <p>Blank field will be treated as zero</p>
         </Col>

         <Col className='form' xs={12} sm={12} md={4} lg={4}>
         <input className='input' type="number" min='60'  onChange={(e) => this.validate(e)} value={this.state.FHR} placeholder='Baseline Fetal Heart Rate' />
         </Col>
     
         <Col className='form' xs={12} sm={12} md={4} lg={4}>
         <input className='input' type="number" min='0'  onChange={(e) => this.setState({ ACC: parseFloat(e.target.value)})} value={this.state.ACC} placeholder='Accelerations/second' />
         </Col>
     
         <Col className='form' xs={12} sm={12} md={4} lg={4}>
         <input className='input' type="number" min='0'  onChange={(e) => this.setState({ fetalMovements : parseFloat(e.target.value)})} value={this.state.fetalMovements} placeholder='Fetal movements/second' />
         </Col>
     
         <Col className='form' xs={12} sm={12} md={4} lg={4}>
         <input className='input' type="number" min='0'  onChange={(e) => this.setState({utereneCont : parseFloat(e.target.value)})} value={this.state.utereneCont} placeholder='Uterine contractions/second' />
         </Col>
     
         <Col className='form' xs={12} sm={12} md={4} lg={4}>
         <input className='input' type="number" min='0'  onChange={(e) => this.setState({ lightDec: parseFloat(e.target.value)})} value={this.state.lightDec} placeholder='Light decelerations/second' />
         </Col>
     
         <Col className='form' xs={12} sm={12} md={4} lg={4}>
         <input className='input' type="number" min='0'  onChange={(e) => this.setState({ severeDec : parseFloat(e.target.value)})} value={this.state.severeDec} placeholder='Severe decelerations/second' />
         </Col>
     
         <Col className='form' xs={12} sm={12} md={4} lg={4}>
         <input className='input' type="number" min='0'  onChange={(e) => this.setState({ prolonedDec : parseFloat(e.target.value)})} value={this.state.prolonedDec} placeholder='Prolongued decelerations/second' />
         </Col>
     
         <Col className='form' xs={12} sm={12} md={4} lg={4}>
         <input className='input' type="number" min='0'  onChange={(e) => this.setState({ percentSTR : parseFloat(e.target.value)})} value={this.state.percentSTR} placeholder='% of time with abnormal STR' />
         </Col>
         
         <Col className='form' xs={12} sm={12} md={4} lg={4}>
         <input className='input' type="number" min='0'  onChange={(e) => this.setState({ meanSTV : parseFloat(e.target.value)})} value={this.state.meanSTV} placeholder='Mean value of short term variability' />
         </Col>
     
         <Col className='form' xs={12} sm={12} md={4} lg={4}>
         <input className='input' type="number" min='0'  onChange={(e) => this.setState({ percentLTR: parseFloat(e.target.value)})} value={this.state.percentLTR} placeholder='% of time with abnormal LTR' />
         </Col>
     
         <Col className='form' xs={12} sm={12} md={4} lg={4}>
         <input className='input' type="number" min='0'  onChange={(e) => this.setState({meanLTV : parseFloat(e.target.value)})} value={this.state.meanLTV} placeholder='Mean value of long term variability' />
         </Col>
     
        
     
     
         <Col className='form' xs={12} sm={12} md={12} lg={12}>
         <Button variant="danger" size='lg' disabled={this.state.btnDisabled} onClick={(e) => this.handlePredict(e)} >Predict</Button>
         </Col>
     
      
     
     
       </Row> 
     </Container>
     )}
      
      </div>

      { this.state.showMain &&
   (  
     <>
      <hr/>
      <div>
      <About/>
      </div>
      </>
   )}

         </>
    )
    }
}
 

export default App;

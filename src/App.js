import {Row, Col, Container, Button, Image, Badge} from 'react-bootstrap'
import './App.css'
import Img from './undraw_baby.png'
import AI from './AI.png'


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



function App() {
  return (
    <>
 <NavigationBar/>

 <div className='main' >
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
    <Col className='form' xs={12} sm={12} md={4} lg={4}>
    <input className='input' type="number" name="name" placeholder='Baseline Fetal Heart Rate' />
    </Col>

    <Col className='form' xs={12} sm={12} md={4} lg={4}>
    <input className='input' type="number" name="name" placeholder='Accelerations/second' />
    </Col>

    <Col className='form' xs={12} sm={12} md={4} lg={4}>
    <input className='input' type="number" name="name" placeholder='Fetal movements/second' />
    </Col>

    <Col className='form' xs={12} sm={12} md={4} lg={4}>
    <input className='input' type="number" name="name" placeholder='Uterine contractions/second' />
    </Col>

    <Col className='form' xs={12} sm={12} md={4} lg={4}>
    <input className='input' type="number" name="name" placeholder='Light decelerations/second' />
    </Col>

    <Col className='form' xs={12} sm={12} md={4} lg={4}>
    <input className='input' type="number" name="name" placeholder='Severe decelerations/second' />
    </Col>

    <Col className='form' xs={12} sm={12} md={4} lg={4}>
    <input className='input' type="number" name="name" placeholder='Prolongued decelerations/second' />
    </Col>

    <Col className='form' xs={12} sm={12} md={4} lg={4}>
    <input className='input' type="number" name="name" placeholder='% of time with abnormal STR' />
    </Col>
    
    <Col className='form' xs={12} sm={12} md={4} lg={4}>
    <input className='input' type="number" name="name" placeholder='Mean value of short term variability' />
    </Col>

    <Col className='form' xs={12} sm={12} md={4} lg={4}>
    <input className='input' type="number" name="name" placeholder='% of time with abnormal LTR' />
    </Col>

    <Col className='form' xs={12} sm={12} md={4} lg={4}>
    <input className='input' type="number" name="name" placeholder='Mean value of long term variability' />
    </Col>

    <Col xs={12} sm={12} md={12} lg={12} style={{paddingLeft:'40px', fontSize:'small'}} >
    All inputs should be numeric
    </Col>


    <Col className='form' xs={12} sm={12} md={12} lg={12}>
    <Button variant="danger" size='lg' >Predict</Button>
    </Col>

 


  </Row> 
</Container>
 
 </div>
 <hr/>
 <div>
 <About/>
 </div>
    </>
  );
}

export default App;

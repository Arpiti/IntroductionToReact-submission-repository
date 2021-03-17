const Content = ({parts}) => {
    return (
        <ul>
            {parts.map((part)=>{
                return ( <li key={part.id}> {part.name} {part.exercises}</li> );
            })}
        </ul>
    );
}

const Course = (props) => {
  //  console.log(props.course.parts);
  const totSum = props.course.parts.reduce(function(sum,part){
    return sum = sum + part.exercises;
},0);

    return (
        
        <div>
            <h1> {props.course.name}</h1>    
            <br></br>
            <Content parts={props.course.parts}></Content>
            <strong> total of {totSum} exercises </strong>
        </div>
    )
}

export default Course;

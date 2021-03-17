const Content = ({parts}) => {
    return (
        <ul>
            {parts.map((part)=>{
                return ( <li> {part.name} {part.exercises}</li> );
            })}
        </ul>
    );
}

const Course = (props) => {
  //  console.log(props.course.parts);
    return (
        
        <div>
            <h1> {props.course.name}</h1>    
            <br></br>
            <Content parts={props.course.parts}></Content>
        </div>
    )
}

export default Course;

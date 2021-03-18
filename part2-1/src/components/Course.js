const Content = ({parts}) => {
    return (
        <ul>
            {parts.map((part)=>{
                return ( <li key={part.id}> {part.name} {part.exercises}</li> );
            })}
        </ul>
    );
}

const Heading = ({name}) => {
    return (
        <div>
        <h1>{name}</h1>
        <br></br>
        </div>
    )
}

const Course = ({courses}) => {

    //  console.log(props.course.parts);
  

    return (
        
        <div>
            {courses.map((course)=>{
                 const totSum = course.parts.reduce((sum,part) =>  sum = sum + part.exercises ,0);
                return (
                   
                    <div key={course.id}>
                        <Heading name={course.name}></Heading>
                        <Content parts={course.parts}></Content>
                        <strong> total of {totSum} exercises </strong>
                    </div>
             )
            })} 
           
        </div>
    )
}

export default Course;

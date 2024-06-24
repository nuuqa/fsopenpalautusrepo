// CourseTitle
const CourseTitle = ({course}) =>{
    console.log(course)
    return(
      <div>
        <h2>{course.name}</h2>
      </div>
    )
  }
    
  // Course
  const Course = ({course}) => {
    return(
      <div>
      <CourseTitle course={course}/>
      <Content course={course}/>
      </div>
    )
  }
  
  // Content
  const Content = ({course}) =>{
    console.log('Content:', course)
    return(
      <div>
          {course.parts.map(part => 
            <Part key={part.id} part={part}/>
          )}
          <Total parts={course.parts}/>
      </div>
    )
  }
  
  // Part
  const Part = ({part}) =>{
    console.log('Part:', part)
    return(
        <p>{part.name}: {part.exercises}</p>
    )
  }
  
  // Total
  const Total = ({parts}) =>{
    console.log('Total:', parts)
    return(
      <div>
        <p><strong>Number of exercises: {parts.reduce((sum, parts) => sum + parts.exercises, 0)}</strong></p>
      </div>
    )
  }

  export default Course
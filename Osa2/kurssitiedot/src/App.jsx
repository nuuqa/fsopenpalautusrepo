import Course from './components/Course'

// Header
const Header = ({text}) => {
  console.log(text)
  return(
    <div>
      <h1>{text}</h1>
    </div>

  )
}

// Courses
  const Courses = ({courses}) => {
    console.log(courses)
    return(
      <div>
        <Header text="Web development curriculum"/>
        {courses.map(course => <Course key={course.id} course={course}/>)}
      </div>
    )
  }

// App
const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Courses courses={courses} />
    </div>
  )
}


export default App

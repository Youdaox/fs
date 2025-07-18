const Course = ({course}) => {
  console.log(course)
  const sum = course.parts.reduce((accum, current) => accum + current.exercises, 0)
  console.log(sum);
  
    return (
      <>
      <h1> {course.name}</h1>
        {course.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
        <p>total of {sum} exercises</p>
      </>
    )
}
export default Course
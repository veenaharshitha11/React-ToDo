import './TodoList.css'

const TodoList = ({ list, remove }) => {
  return (
    <>
      <div className='todos'>
      {list?.length > 0 ? (
        <ul className="todo-list">
          {list.map((entry) => (
            <div className="todo-item" key={entry._id}>
              <li> {entry.text} </li>
              <button className="delete-button"  onClick={() => { remove(entry._id); }}>
                Delete
              </button>
            </div>
          ))}
        </ul>
      ) : (
        <div className="empty">
          <p>No task found</p>
        </div>
      )}
      </div>
    </>
  );
};

export default TodoList;
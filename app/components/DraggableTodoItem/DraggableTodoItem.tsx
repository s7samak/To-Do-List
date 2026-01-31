import { TodoItem } from "../TodoItem/TodoItem";

export function DraggableTodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
}: any) { // ✅ drop على العنصر كله

  return (
    <div className="mt-9">
      <TodoItem
        todo={todo}
        onToggle={onToggle}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </div>
  );
}
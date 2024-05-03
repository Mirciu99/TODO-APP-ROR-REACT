class TodosController < ApplicationController
  # protect_from_forgery with: :null_session

  def index
  end

  # GET /todos/index
  def show_all
    @todos = Todo.all
    render json: @todos
  end

  # POST /todos/create
  def create
    @todo = Todo.new(todo_params)
    if @todo.save
      render json: @todo, status: :created
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  # GET /todos/show/:id
  def show
    @todo = Todo.find(params[:id])
    render json: @todo
  end

  # PUT /todos/update/:id
  def update
    @todo = Todo.find(params[:id])
    if @todo.update(todo_params)
      render json: @todo
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end
  
  # DELETE /todos/destroy/:id
  def destroy
    @todo = Todo.find(params[:id])
    if @todo.destroy
      render json: { message: 'Todo deleted successfully' }, status: :ok
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  private

  # Only allow a list of trusted parameters through.
  def todo_params
    params.require(:todo).permit(:todo, :status)
  end
end

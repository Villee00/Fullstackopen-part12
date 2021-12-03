import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Todo from './Todo'

test("Todo component", () =>{
    const todo = {
        _id: "61a56a33caf632286080d18a",
        text: "Write code",
        done: false
    }

    const onClickDelete = jest.fn();
    const onClickComplete = jest.fn();

    const component = render(
        <Todo todo={todo} onClickDelete={onClickDelete} onClickComplete={onClickDelete}/>
    )

    expect(component.container).toHaveTextContent(
        'Set as done'
    );
    expect(component.container).toHaveTextContent(
        'Write code'
    );
})
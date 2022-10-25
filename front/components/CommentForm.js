import { Button, Form, Input } from "antd"
import { useCallback } from "react"
import { useSelector } from "react-redux"
import useInput from "../hooks/useInput"

const CommentForm = ({post}) => {
    const id = useSelector((state) => state.user.me?.id)
    const [commentText,  setCommentText] = useInput('')
    const onSubmitComment = useCallback(() => {

    },[commentText])

    return(
        <Form onFinish={onSubmitComment}>
            <Form.Item style={{position : "relative"}}>
                <Input.TextArea value={commentText} onChange={setCommentText} rows={4}/>
                <Button style={{position : "relative"}} type="primary" htmlType="submit">삐약</Button>
            </Form.Item>
        </Form>
    )
}

export default CommentForm
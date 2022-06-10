import { Button, Form, Input } from "antd"
import Link from "next/link"
import { useCallback, useState } from "react"

const LoginForm = () => {
    const [id, setId] = useState("")
    const [password, setPassword] = useState("")

    const onChangeId = useCallback((e)=> {
        setId(e.target.value)
    }, []);
    const onChangePassword = useCallback((e)=> {
        setPassword(e.target.value)
    }, []);

    return(
        <Form>
            <div>
                <label htmlFor="user-id">아이디</label><br/>
                <Input 
                    name="user-id" 
                    value={id} 
                    onChange={onChangeId} 
                    required
                />
                {/* label의 htmlFor와 input의 name을 연결 */}
            </div>
            <div>
                <label htmlFor="user-password">비밀번호</label><br/>
                <Input 
                    name="user-password" 
                    type="password" 
                    value={password} 
                    onChange={onChangePassword} 
                    required
                />
            </div>
            <div>
                <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
                <Link href="/signup"><a><Button>회원가입</Button></a></Link>
            </div>
        </Form>
    )
}

export default LoginForm
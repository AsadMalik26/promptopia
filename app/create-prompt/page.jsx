'use client'
import { useSession } from "next-auth/react"
import Form from "/components/Form"
import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
export default function CreatePrompt() {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  })
  useEffect(() => {
    console.log(post)
  }, [post])
  const createPrompt = useCallback(async (e) => {
    e?.preventDefault()
    setSubmitting(true);
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post?.prompt,
          tag: post?.tag,
          userId: session?.user?.id
        })
      })
      if (response.ok) {
        router.push("/")
      }
    } catch (error) {
      console.log(error, "error")
    }
  }, [post, session, router])
  return (
    <>
      <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
      />
    </>
  )
}

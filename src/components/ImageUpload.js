import { Button } from 'antd'
import { storage } from 'firebase'
import React from 'react'
import { db, timestamp } from '../config/firebase'

const ImageUpload = () => {
    const [image, setImage] = useState(null)
    const [progress, setProgress] = useState(0)
    const [caption, setCaption] = useState('')

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put()

        uploadTask.on(
            "state_change",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                setProgress(progress)
            },
            (error) => {
                console.log(error)
                alert(error.message)
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownLoadURL()
                    .then(url => {
                        db.collection("post").add({
                            timestamp: timestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username

                        })
                    })
            }

        )
    }
    return (
        <div>
            {/* I want to have... */}
            {/* Caption input */}
            {/* File Picker */}
            {/* Post button */}

            <input type="text" placeholder="Enter a caption..." onchange={} />
            <input type="file" onChange={handleChange} />
            <Button onClick={handleUpload}>Upload</Button>

        </div>
    )
}

export default ImageUpload

import { useForm, Controller } from "react-hook-form"
import { Input } from "@material-ui/core"
import { addDoc, collection, getFirestore } from "@firebase/firestore"
import firebase from "./src/firebase"

export default function Form() {
    const { register, handleSubmit, formState: { errors }, watch, control } = useForm()

    // console.log(firebase)

    const watchValue = watch()
    // console.log(watchValue)

    const db = getFirestore()

    const answer = (data) => {
        return (
            data.programLanguages ?
                data.programLanguages : null
        )
    }

    const onSubmit = (data) => {
        addDoc(collection(db, 'answer'), {
            Q1: data.name,
            Q2: data.birthday,
            Q3: data.isLearning,
            Q4: data.wasLearning,
            Q5: answer(data)
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor='name'>Q1. 名前を入力してください（匿名可）。</label>
                <Controller
                    name='name'
                    control={control}
                    defaultValue=''
                    render={({ field: { value, onChange } }) => <Input value={value} onChange={onChange} />}
                />
            </div>

            <div>
                <label htmlFor='birthday'>Q2.生年月日を入力してください。(例： 19900101)</label>
                <Controller
                    name='birthday'
                    defaultValue=''
                    control={control}
                    rules={{ required: true, pattern: /^[0-9]{8}$/ }}
                    render={({ field: { value, onChange } }) => <Input value={value} onChange={onChange} />}
                />
                {
                    errors.birthday && errors.birthday.type === 'required' ?
                        <span>このフィールドは回答必須です。</span> : null
                }
                {
                    errors.birthday && errors.birthday.type === 'pattern' ?
                        <span>整数8桁で回答してください</span> : null
                }
            </div>

            <div>
                <span>Q3.現在、プログラミングを勉強していますか？</span>

                <input
                    id='isLearning1'
                    {...register("isLearning", { required: true })}
                    type='radio'
                    name="isLearning"
                    value='はい'
                />
                <label htmlFor='isLearning'>はい</label>

                <input
                    id='isLearning2'
                    {...register("isLearning", { required: true })}
                    type='radio'
                    name="isLearning"
                    value='いいえ'
                />
                <label htmlFor='isLearning'>いいえ</label>
                {
                    errors.isLearning &&
                    <span>このフィールドは回答必須です。</span>
                }


            </div>

            <div>
                <span>Q4.これまでに、プログラミングを勉強したことがありますか？</span>

                <input
                    id='wasLearning1'
                    {...register('wasLearning', { required: true })}
                    type='radio'
                    name='wasLearning'
                    value='はい'
                />
                <label htmlFor='wasLearning'>はい</label>

                <input
                    id='wasLearning2'
                    {...register('wasLearning', { required: true })}
                    type='radio'
                    name='wasLearning'
                    value='いいえ'
                />
                <label htmlFor='wasLearning'>いいえ</label>
                {
                    errors.wasLearning &&
                    <span>このフィールドは回答必須です。</span>
                }

            </div>
            {

                (watchValue.isLearning === 'はい' || watchValue.wasLearning === 'はい') &&
                <div>
                    <label htmlFor='programLanguages'>
                        Q5.今まで学習したことのあるプログラミング言語をすべて教えてください。
                    </label>
                    <input
                        id='programLanguages'
                        {...register('programLanguages')}
                        type='textarea'
                        name='programLanguages'
                    />
                </div>
            }

            <input type='submit' value='アンケートを提出する' />
        </form>
    )
}
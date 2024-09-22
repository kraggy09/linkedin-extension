import react, { useState, useRef, useEffect } from 'react'

function Form() {

    const [skills, setSkills] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [formData, setFormData] = useState({
        senderName: '',
        currentRole: '',
        jobTitle: '',
        jobID: '',
        jobURL: '',
        resumeLink: '',
    });

    const inputRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [skills])

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputKey = (e) => {
        if (e.key === 'Enter' && inputValue.trim() != '') {
            e.preventDefault();
            setSkills([...skills, inputValue.trim()]);
            setInputValue('');
        }
    };

    const removeSkill = (indexToRemove, e) => {
        e.preventDefault();
        e.stopPropagation();

        const newSkills = [...skills];
        newSkills.splice(indexToRemove, 1);
        setSkills(newSkills);

    };

    const focusInput = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }

    const handleFormDataChange = (e) => {
        setFormData({
            ...formData, [e.target.id]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formDataCopy = {
            ...formData, skills
        };

        localStorage.setItem("formData", JSON.stringify(formDataCopy));
        alert("Form submitted successfully!");
        console.log(formDataCopy);
    };



    return (
        <div >
            <div className='flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200 '>
                <div className=' shadow-lg bg-white w-[400px] rounded-t-lg rounded-b-lg mt-4 mb-4 '>
                    <div className='bg-gradient-to-r from-sky-600 to-sky-700 text-white rounded-t-lg '>
                        <h2 className='text-2xl text-center py-3 font-bold'>Linkedin Referral</h2>
                    </div>
                    <form action='' className='px-8 py-2 mt-4 mb-4 space-y-4 '>
                        <div className=' grid w-full gap-y-4'>
                            <div className='grid w-full items-center'>
                                <label htmlFor='senderName' className='text-sm font-bold text-sky-700 '>Your Name</label>
                                <input
                                    className='flex h-10 w-full rounded-md border-2 border-sky-300 px-3'
                                    type='text'
                                    id="senderName"
                                    value={formData.senderName}
                                    onChange={handleFormDataChange}
                                    placeholder='John Doe'
                                />
                            </div>
                        </div>
                        <div className='grid w-full gap-y-4'>
                            <div className='grid w-full items-center'>
                                <label htmlFor='currentRole' className='text-sm font-bold text-sky-700 '>Your Current Role</label>
                                <input
                                    className='flex h-10 w-full rounded-md border-2 border-sky-300 px-3'
                                    type='text'
                                    id="currentRole"
                                    value={formData.currentRole}
                                    onChange={handleFormDataChange}
                                    placeholder='Fronted Developer'
                                />
                            </div>
                        </div>
                        <div className=' grid w-full gap-y-4'>
                            <div className='grid w-full items-center'>
                                <label htmlFor='jobTitle' className='text-sm font-bold text-sky-700'>Desired Job Title</label>
                                <input
                                    className='flex h-10 w-full rounded-md border-2 border-sky-300 px-3'
                                    type='text'
                                    id="jobTitle"
                                    value={formData.jobTitle}
                                    onChange={handleFormDataChange}
                                    placeholder='Full Stack Developer'
                                />
                            </div>
                        </div>
                        <div className='w-full'
                            onClick={(focusInput)}
                            ref={containerRef}>

                            <label htmlFor='relevantSkills' className='text-sm font-bold text-sky-700'>Relevant Skills</label>
                            <div className='flex items-center flex-wrap gap-2 border-2 border-sky-300 rounded-md px-2 py-2  max-h-32 overflow-y-auto'
                                style={{ minHeight: '50px' }} >
                                {skills.map((skill, index) => (
                                    <span key={index} className='bg-blue-100 text-sky-600 px-3 py-1 rounded-md text-sm flex-items-center'>
                                        {skill}
                                        <button onClick={(e) => removeSkill(index, e)} className='ml-2 text-sky-600 hover:text-sky-800'>
                                            &#x2715;
                                        </button>
                                    </span>
                                ))}
                                <input
                                    className='w-full flex-grow outline-none bg-transparent'
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    onKeyDown={handleInputKey}
                                    id="relevantSkills"
                                    placeholder={skills.length === 0 ? "Type a skill and press Enter" : "Type a skill"}
                                />

                            </div>
                        </div>
                        <div className='grid w-full gap-y-4'>
                            <div className='grid w-full items-center'>
                                <label htmlFor='jobID' className='text-sm font-bold text-sky-700'>Job/Req ID</label>
                                <input
                                    className='flex h-10 w-full rounded-md border-2 border-sky-300 px-3'
                                    type='text'
                                    id="jobID"
                                    value={formData.jobID}
                                    onChange={handleFormDataChange}
                                    placeholder='1393069'
                                />
                            </div>
                        </div>
                        <div className='grid w-full gap-y-4'>
                            <div className='grid w-full items-center'>
                                <label htmlFor='jobURL' className='text-sm font-bold text-sky-700'>Job URL</label>
                                <input
                                    className='flex h-10 w-full rounded-md border-2 border-sky-300 px-3'
                                    type='url'
                                    id="jobURL"
                                    value={formData.jobURL}
                                    onChange={handleFormDataChange}
                                    placeholder='https://example.com/jobs/123'
                                />
                            </div>
                        </div>
                        <div className='grid w-full gap-y-4'>
                            <div className='grid w-full items-center'>
                                <label htmlFor='resumeLink' className='text-sm font-bold text-sky-700'>Resume Link</label>
                                <input
                                    className='flex h-10 w-full rounded-md border-2 border-sky-300 px-3'
                                    type='url'
                                    id="resumeLink"
                                    value={formData.resumeLink}
                                    onChange={handleFormDataChange}
                                    placeholder='resume.view'
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="button"
                                className="h-10 bg-sky-600 hover:bg-black text-white w-full mt-4 flex items-center justify-center cursor-pointer"
                                onClick={handleSubmit}
                            >Generate Message
                            </button>
                        </div>

                    </form>
                    <div className=' py-1 bg-gradient-to-r from-sky-600 to-sky-700 text-white rounded-b-lg'></div>
                </div>
            </div>
        </div>
    )
}
export default Form

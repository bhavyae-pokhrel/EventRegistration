import React, { useState } from 'react';
import './EventRegistrationForm.css'; // Import your CSS file

const EventRegistrationForm = () => {
    const initialFormData = {
        name: '',
        email: '',
        age: '',
        isAttendingWithGuest: false,
        guestName: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            displayFormSummary();
            setFormData(initialFormData); // Clear form fields after successful submission
        }
    };

    const validateForm = (data) => {
        let errors = {};

        if (!data.name) {
            errors.name = 'Name is required';
        }

        if (!data.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = 'Email is invalid';
        }

        if (!data.age) {
            errors.age = 'Age is required';
        } else if (isNaN(data.age) || data.age <= 0) {
            errors.age = 'Age must be a number greater than 0';
        }

        if (data.isAttendingWithGuest && !data.guestName) {
            errors.guestName = 'Guest Name is required';
        }

        return errors;
    };

    const displayFormSummary = () => {
        // You can replace this with actual submission logic (e.g., API call)
        alert(`Form submitted with data:\n
              Name: ${formData.name}\n
              Email: ${formData.email}\n
              Age: ${formData.age}\n
              Attending with Guest: ${formData.isAttendingWithGuest ? 'Yes' : 'No'}\n
              Guest Name: ${formData.guestName}`);
    };

    return (
        <div className="form-container">
            <h2>Event Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <p className="error">{errors.name}</p>}
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>

                <div className="form-group">
                    <label>Age</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                    />
                    {errors.age && <p className="error">{errors.age}</p>}
                </div>

                <div className="form-group">
                    <label>Are you attending with a guest?</label>
                    <label>
                        <input
                            type="checkbox"
                            name="isAttendingWithGuest"
                            checked={formData.isAttendingWithGuest}
                            onChange={handleChange}
                        /> Yes
                    </label>
                </div>

                {formData.isAttendingWithGuest && (
                    <div className="form-group">
                        <label>Guest Name</label>
                        <input
                            type="text"
                            name="guestName"
                            value={formData.guestName}
                            onChange={handleChange}
                        />
                        {errors.guestName && <p className="error">{errors.guestName}</p>}
                    </div>
                )}

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default EventRegistrationForm;

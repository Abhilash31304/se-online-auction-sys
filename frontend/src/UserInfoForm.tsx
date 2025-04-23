import React, { useState } from 'react';
import './UserInfoForm.css';
import { useNavigate } from 'react-router-dom';

const UserInfoForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !profilePhoto) {
      alert('Please fill in all fields.');
      return;
    }

    // Example form data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    if (profilePhoto) formData.append('profilePhoto', profilePhoto);

    console.log('Form submitted:', { name, email, password, profilePhoto });
    alert('User info submitted!');

    // ✅ Navigate to Dashboard after submit
    navigate('/dashboard');
  };

  return (
    <div className="user-info-container">
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleSubmit} className="user-info-form">
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter a password"
            required
          />
        </label>

        <label>
          Profile Photo:
          <input type="file" accept="image/*" onChange={handlePhotoChange} required />
        </label>

        {photoPreview && (
          <div className="photo-preview">
            <img src={photoPreview} alt="Profile Preview" />
          </div>
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserInfoForm;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    FaEye,
    FaEyeSlash,
    FaLock,
    FaCheck,
    FaTimes,
    FaArrowLeft
} from 'react-icons/fa';
import { BiCameraMovie } from 'react-icons/bi';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [errors, setErrors] = useState({});
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordStrengthText, setPasswordStrengthText] = useState('');

    // Validate form when inputs change
    useEffect(() => {
        validateForm();
    }, [currentPassword, newPassword, confirmPassword]);

    // Check password strength when new password changes
    useEffect(() => {
        checkPasswordStrength(newPassword);
    }, [newPassword]);

    // Function to check password strength
    const checkPasswordStrength = (password) => {
        let strength = 0;

        if (password.length === 0) {
            setPasswordStrength(0);
            setPasswordStrengthText('');
            return;
        }

        // Length check
        if (password.length > 6) strength += 1;
        if (password.length > 10) strength += 1;

        // Character type checks
        if (/[A-Z]/.test(password)) strength += 1; // Has uppercase
        if (/[a-z]/.test(password)) strength += 1; // Has lowercase
        if (/[0-9]/.test(password)) strength += 1; // Has number
        if (/[^A-Za-z0-9]/.test(password)) strength += 1; // Has special char

        setPasswordStrength(strength);

        // Set text based on strength
        if (strength <= 2) {
            setPasswordStrengthText('Yếu');
        } else if (strength <= 4) {
            setPasswordStrengthText('Trung bình');
        } else {
            setPasswordStrengthText('Mạnh');
        }
    };

    // Validate the form fields
    const validateForm = () => {
        const newErrors = {};

        // Current password validation
        if (currentPassword.trim() === '') {
            newErrors.currentPassword = 'Vui lòng nhập mật khẩu hiện tại';
        }

        // New password validation
        if (newPassword.trim() === '') {
            newErrors.newPassword = 'Vui lòng nhập mật khẩu mới';
        } else if (newPassword.trim().length < 6) {
            newErrors.newPassword = 'Mật khẩu phải có ít nhất 6 ký tự';
        } else if (newPassword === currentPassword) {
            newErrors.newPassword = 'Mật khẩu mới phải khác mật khẩu hiện tại';
        }

        // Confirm password validation
        if (confirmPassword.trim() === '') {
            newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu mới';
        } else if (confirmPassword !== newPassword) {
            newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Here you would typically send the request to your backend
            // For demo purposes, we'll just simulate success
            console.log('Password change request:', {
                currentPassword,
                newPassword
            });

            // Simulate API call delay
            setTimeout(() => {
                setPasswordChanged(true);

                // Reset form
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setPasswordStrength(0);
                setPasswordStrengthText('');
            }, 1000);
        }
    };

    // Get color for password strength meter
    const getStrengthColor = () => {
        if (passwordStrength <= 2) return 'bg-red-500';
        if (passwordStrength <= 4) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Header with Logo */}
            <div className="bg-gradient-to-r from-purple-900 to-indigo-800 shadow-lg">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <div className="flex items-center transition-transform duration-300 hover:scale-105">
                                <BiCameraMovie className="text-yellow-300 text-4xl" />
                                <span className="ml-2 text-white font-bold text-xl">
                                    CineStar
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-10">
                <div className="max-w-lg mx-auto">
                    {/* Back button */}
                    <Link
                        to="/profile"
                        className="inline-flex items-center text-gray-300 hover:text-yellow-400 mb-6 transition-colors"
                    >
                        <FaArrowLeft className="mr-2" />
                        <span>Quay lại trang cá nhân</span>
                    </Link>

                    {/* Page title */}
                    <h1 className="text-3xl font-bold mb-8 text-center">
                        Thay đổi mật khẩu
                    </h1>

                    {!passwordChanged ? (
                        // Password change form
                        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Current Password Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Mật khẩu hiện tại
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaLock className="text-gray-500" />
                                        </div>
                                        <input
                                            type={
                                                showCurrentPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            value={currentPassword}
                                            onChange={(e) =>
                                                setCurrentPassword(
                                                    e.target.value
                                                )
                                            }
                                            className={`w-full bg-gray-700 border ${
                                                errors.currentPassword
                                                    ? 'border-red-500'
                                                    : 'border-gray-600'
                                            } rounded-lg pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                                            placeholder="Nhập mật khẩu hiện tại"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            onClick={() =>
                                                setShowCurrentPassword(
                                                    !showCurrentPassword
                                                )
                                            }
                                        >
                                            {showCurrentPassword ? (
                                                <FaEyeSlash className="text-gray-400 hover:text-white" />
                                            ) : (
                                                <FaEye className="text-gray-400 hover:text-white" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.currentPassword && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.currentPassword}
                                        </p>
                                    )}
                                </div>

                                {/* New Password Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Mật khẩu mới
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaLock className="text-gray-500" />
                                        </div>
                                        <input
                                            type={
                                                showNewPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            value={newPassword}
                                            onChange={(e) =>
                                                setNewPassword(e.target.value)
                                            }
                                            className={`w-full bg-gray-700 border ${
                                                errors.newPassword
                                                    ? 'border-red-500'
                                                    : 'border-gray-600'
                                            } rounded-lg pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                                            placeholder="Nhập mật khẩu mới"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            onClick={() =>
                                                setShowNewPassword(
                                                    !showNewPassword
                                                )
                                            }
                                        >
                                            {showNewPassword ? (
                                                <FaEyeSlash className="text-gray-400 hover:text-white" />
                                            ) : (
                                                <FaEye className="text-gray-400 hover:text-white" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.newPassword && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.newPassword}
                                        </p>
                                    )}

                                    {/* Password strength meter */}
                                    {newPassword && (
                                        <div className="mt-2">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-xs text-gray-400">
                                                    Độ mạnh mật khẩu:
                                                </span>
                                                <span
                                                    className={`text-xs font-medium ${
                                                        passwordStrength <= 2
                                                            ? 'text-red-400'
                                                            : passwordStrength <=
                                                                4
                                                              ? 'text-yellow-400'
                                                              : 'text-green-400'
                                                    }`}
                                                >
                                                    {passwordStrengthText}
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-600 rounded-full h-1.5">
                                                <div
                                                    className={`h-1.5 rounded-full ${getStrengthColor()}`}
                                                    style={{
                                                        width: `${(passwordStrength / 6) * 100}%`
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Password requirements */}
                                    <div className="mt-2 grid grid-cols-2 gap-1">
                                        <div className="flex items-center text-xs">
                                            {/[A-Z]/.test(newPassword) ? (
                                                <FaCheck className="text-green-500 mr-1" />
                                            ) : (
                                                <FaTimes className="text-gray-500 mr-1" />
                                            )}
                                            <span
                                                className={`${/[A-Z]/.test(newPassword) ? 'text-green-500' : 'text-gray-400'}`}
                                            >
                                                Chữ in hoa
                                            </span>
                                        </div>
                                        <div className="flex items-center text-xs">
                                            {/[a-z]/.test(newPassword) ? (
                                                <FaCheck className="text-green-500 mr-1" />
                                            ) : (
                                                <FaTimes className="text-gray-500 mr-1" />
                                            )}
                                            <span
                                                className={`${/[a-z]/.test(newPassword) ? 'text-green-500' : 'text-gray-400'}`}
                                            >
                                                Chữ thường
                                            </span>
                                        </div>
                                        <div className="flex items-center text-xs">
                                            {/[0-9]/.test(newPassword) ? (
                                                <FaCheck className="text-green-500 mr-1" />
                                            ) : (
                                                <FaTimes className="text-gray-500 mr-1" />
                                            )}
                                            <span
                                                className={`${/[0-9]/.test(newPassword) ? 'text-green-500' : 'text-gray-400'}`}
                                            >
                                                Số
                                            </span>
                                        </div>
                                        <div className="flex items-center text-xs">
                                            {/[^A-Za-z0-9]/.test(
                                                newPassword
                                            ) ? (
                                                <FaCheck className="text-green-500 mr-1" />
                                            ) : (
                                                <FaTimes className="text-gray-500 mr-1" />
                                            )}
                                            <span
                                                className={`${/[^A-Za-z0-9]/.test(newPassword) ? 'text-green-500' : 'text-gray-400'}`}
                                            >
                                                Ký tự đặc biệt
                                            </span>
                                        </div>
                                        <div className="flex items-center text-xs">
                                            {newPassword.length >= 6 ? (
                                                <FaCheck className="text-green-500 mr-1" />
                                            ) : (
                                                <FaTimes className="text-gray-500 mr-1" />
                                            )}
                                            <span
                                                className={`${newPassword.length >= 6 ? 'text-green-500' : 'text-gray-400'}`}
                                            >
                                                Ít nhất 6 ký tự
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Confirm Password Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Xác nhận mật khẩu mới
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaLock className="text-gray-500" />
                                        </div>
                                        <input
                                            type={
                                                showConfirmPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            value={confirmPassword}
                                            onChange={(e) =>
                                                setConfirmPassword(
                                                    e.target.value
                                                )
                                            }
                                            className={`w-full bg-gray-700 border ${
                                                errors.confirmPassword
                                                    ? 'border-red-500'
                                                    : 'border-gray-600'
                                            } rounded-lg pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                                            placeholder="Xác nhận mật khẩu mới"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
                                        >
                                            {showConfirmPassword ? (
                                                <FaEyeSlash className="text-gray-400 hover:text-white" />
                                            ) : (
                                                <FaEye className="text-gray-400 hover:text-white" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.confirmPassword}
                                        </p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
                                >
                                    Xác nhận thay đổi
                                </button>
                            </form>
                        </div>
                    ) : (
                        // Success message after password change
                        <div className="bg-gray-800 rounded-lg p-8 shadow-lg text-center">
                            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-900 bg-opacity-30 rounded-full mb-6">
                                <FaCheck className="text-green-400 text-3xl" />
                            </div>
                            <h2 className="text-2xl font-bold text-green-400 mb-4">
                                Mật khẩu đã được thay đổi thành công!
                            </h2>
                            <p className="text-gray-300 mb-8">
                                Mật khẩu của bạn đã được cập nhật. Vui lòng sử
                                dụng mật khẩu mới cho lần đăng nhập tiếp theo.
                            </p>
                            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                                <Link
                                    to="/profile"
                                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                                >
                                    Quay lại trang cá nhân
                                </Link>
                                <Link
                                    to="/"
                                    className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                                >
                                    Đến trang chủ
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;

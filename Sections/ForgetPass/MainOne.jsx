import { useState, useEffect } from "react";
import axios from "axios";
import "./some.css";
import {
    Loader2,
    CheckCircle,
    CircleCheck,
    Eye,
    EyeOff,
    CircleArrowRight
} from "lucide-react";

import { toast } from "sonner";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot
} from "@/components/ui/input-otp";
import CustomImage from "../Universal/CustomImage";

const ForgotPasswordFlow = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [completedSteps, setCompletedSteps] = useState({});

    // Step 1 State
    const [username, setUsername] = useState("");

    // Step 2 State
    const [userDetails, setUserDetails] = useState(null);
    const [userInputEmail, setUserInputEmail] = useState("");
    const [verifyEmailError, setVerifyEmailError] = useState(false);

    // Step 3 State
    const [otp, setOtp] = useState("");

    // Step 4 State
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passIns, setPassIns] = useState(false);
    const [showPass, setShowPass] = useState(true);

    const [passStrength, setPassStrength] = useState(0);
    const [passStrengthText, setPassStrengthText] = useState("");

    //password checker
    const [oneUpperCase, setOneUpperCase] = useState(false);
    const [oneLowerCase, setOneLowerCase] = useState(false);
    const [oneNumber, setOneNumber] = useState(false);
    const [oneSpecial, setOneSpecial] = useState(false);
    const [sevenCher, setSevenCher] = useState(false);
    const [noRandomCher, setNoRandomCher] = useState(true);

    const steps = ["1", "2", "3", "4", "5"];

    const markStepCompleted = step => {
        setCompletedSteps(prev => ({ ...prev, [step]: true }));
    };

    const handleStep1 = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                "/api/mantox/fpass/verify-username",
                {
                    username
                }
            );

            if (response.data.success) {
                setUserDetails(response.data.user);
                markStepCompleted(1);
                setCurrentStep(2);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            //setError("Invalid username or user not found");
            toast.error(
                err.response?.data?.message ||
                err?.message ||
                "Something went wrong, try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleStep2 = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                "/api/mantox/fpass/verify-email",
                {
                    username,
                    email: `${userDetails.firstHalfEmail}${userInputEmail}${userDetails.secondHalfEmail}`
                }
            );

            if (response.data.success) {
                setUserDetails(response.data.user);
                markStepCompleted(2);
                setCurrentStep(3);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            //setError("Email verification failed");
            toast.error(
                err.response?.data?.message ||
                err?.message ||
                "Something went wrong, try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleStep3 = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/mantox/fpass/verify-otp", {
                username,
                otp
            });

            if (response.data.success) {
                markStepCompleted(3);
                setCurrentStep(4);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            //  setError("Invalid OTP entered");
            toast.error(
                err.response?.data?.message ||
                err?.message ||
                "Something went wrong, try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleStep4 = async () => {
        try {
            if (newPassword !== confirmPassword) {
                setError("Passwords do not match");
                return;
            }
            setLoading(true);
            const response = await axios.post("/api/mantox/fpass/change-pass", {
                username,
                newPassword,
                confirmNewPassword: confirmPassword
            });
            if (response.data.success) {
                markStepCompleted(4);
                setCurrentStep(5);
                toast.success(response.data.message);
            } else {
                //setError(response.data.message);
                toast.error(response.data.message);
            }
        } catch (err) {
            toast.error(
                err.response?.data?.message ||
                err?.message ||
                "Something went wrong, try again."
            );
        } finally {
            setLoading(false);
        }
    };

    // for step 2
    const handleEmailChange = e => {
        const value = e.target.value;

        if (value.includes(" ")) {
            setVerifyEmailError(true);
        } else {
            setVerifyEmailError(false);
            setUserInputEmail(value);
        }
    };

    //for step 4

    useEffect(() => {
        const password = newPassword;

        setOneLowerCase(/[a-z]/.test(password));
        setOneUpperCase(/[A-Z]/.test(password));
        setOneNumber(/\d/.test(password));
        setOneSpecial(/[!@#$%^&*]/.test(password));
        setSevenCher(password.length >= 7);

        const allowedCharsRegex = /^[a-zA-Z0-9!@#$%^&*]+$/;
        setNoRandomCher(allowedCharsRegex.test(password));
    }, [newPassword]);

    //pass strength checker
    useEffect(() => {
        let strength = 0;

        if (oneLowerCase) strength++;
        if (oneUpperCase) strength++;
        if (oneNumber) strength++;
        if (oneSpecial) strength++;
        if (sevenCher) strength++;

        setPassStrength(strength);
    }, [oneLowerCase, oneUpperCase, oneNumber, oneSpecial, sevenCher]);

    useEffect(() => {
        let str = "";

        if (passStrength > 0) str = "Very Weak";
        if (passStrength > 1) str = "Weak";
        if (passStrength > 2) str = "Still a little weak";
        if (passStrength > 3) str = "Little bit more...";
        if (passStrength > 4) str = "Strong";

        setPassStrengthText(str);
    }, [passStrength]);

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className=''>
                        <h2 className='mb-8 mt-3 text-[20px] text-center font-bold'>
                            Find your account
                        </h2>
                        <p className='font-semibold ml-1'>Username</p>
                        <input
                            type='text'
                            placeholder='Enter your username'
                            className='w-full p-2 rounded mb-4 outline-none bg-backgroundtwo'
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <button
                            onClick={handleStep1}
                            disabled={loading || !username}
                            className='bg-main text-white p-2 rounded w-full disabled:bg-[#a53d3d]'
                        >
                            {loading ? (
                                <div className='flex gap-2 justify-center items-center'>
                                    <svg className='idk' viewBox='25 25 50 50'>
                                        <circle
                                            className='hmmx'
                                            r='20'
                                            cy='50'
                                            cx='50'
                                        ></circle>
                                    </svg>
                                    <span className='font-bold'>
                                        Finding your account...
                                    </span>
                                </div>
                            ) : (
                                <div className='flex gap-2 justify-center items-center'>
                                    <CircleArrowRight />{" "}
                                    <strong>Continue</strong>
                                </div>
                            )}
                        </button>
                    </div>
                );
            case 2:
                return (
                    <div className=''>
                        <h2 className='mb-8 mt-3 text-[20px] text-center font-bold'>
                            Verify your email
                        </h2>
                        <div className='flex items-center gap-2 mb-4 bg-backgroundtwo w-fit p-2 px-3 rounded-xl'>
                            <CustomImage
                                src={userDetails.profilePicture}
                                alt='Profile'
                                className='w-6 h-6 rounded-full'
                            />
                            <span className='font-semibold'>
                                {userDetails.username}
                            </span>
                        </div>

                        <p className='text-[14px]'>
                            Write the{" "}
                            <strong className='underline'>remaining</strong>{" "}
                            part of your email
                        </p>
                        <div className='flex items-center gap-2 mb-4 mt-1 font-semibold'>
                            <span>{userDetails.firstHalfEmail}</span>
                            <input
                                type='text'
                                placeholder='********************'
                                className='w-32 p-1 rounded outline-none bg-backgroundtwo'
                                value={userInputEmail}
                                onChange={handleEmailChange}
                            />
                            <span>{userDetails.secondHalfEmail}</span>
                        </div>
                        {verifyEmailError && (
                            <p className='text-[14px] text-red-600 mb-1'>
                                Remaining email can't have spaces
                            </p>
                        )}
                        <button
                            onClick={handleStep2}
                            disabled={
                                loading || !userInputEmail || verifyEmailError
                            }
                            className='bg-main text-white p-2 rounded w-full disabled:bg-[#a53d3d]'
                        >
                            {loading ? (
                                <div className='flex gap-2 justify-center items-center'>
                                    <svg className='idk' viewBox='25 25 50 50'>
                                        <circle
                                            className='hmmx'
                                            r='20'
                                            cy='50'
                                            cx='50'
                                        ></circle>
                                    </svg>
                                    <span className='font-bold'>
                                        Verifying...
                                    </span>
                                </div>
                            ) : (
                                <div className='flex gap-2 justify-center items-center'>
                                    <CircleArrowRight />{" "}
                                    <strong>Continue</strong>
                                </div>
                            )}
                        </button>
                    </div>
                );
            case 3:
                return (
                    <div className='space-y-4'>
                        <h2 className='mb-8 mt-3 text-[20px] text-center font-bold'>
                            Verify OTP
                        </h2>
                        <p className='text-center'>
                            We have sent an OTP to the email you verified. If
                            you can't find the email, you might wanna check your{" "}
                            <strong className='underline'>Spam Folder</strong>.
                        </p>

                        <div className='flex justify-center'>
                            <InputOTP
                                maxLength={6}
                                value={otp}
                                onChange={value => setOtp(value)}
                            >
                                <InputOTPGroup>
                                    <InputOTPSlot
                                        className='bg-backgroundtwo'
                                        index={0}
                                    />
                                    <InputOTPSlot
                                        className='bg-backgroundtwo'
                                        index={1}
                                    />
                                    <InputOTPSlot
                                        className='bg-backgroundtwo'
                                        index={2}
                                    />
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup>
                                    <InputOTPSlot
                                        className='bg-backgroundtwo'
                                        index={3}
                                    />
                                    <InputOTPSlot
                                        className='bg-backgroundtwo'
                                        index={4}
                                    />
                                    <InputOTPSlot
                                        className='bg-backgroundtwo'
                                        index={5}
                                    />
                                </InputOTPGroup>
                            </InputOTP>
                        </div>

                        <button
                            onClick={handleStep3}
                            disabled={loading || !otp || otp.length !== 6}
                            className='bg-main text-white p-2 rounded w-full disabled:bg-[#a53d3d]'
                        >
                            {loading ? (
                                <div className='flex gap-2 justify-center items-center'>
                                    <svg className='idk' viewBox='25 25 50 50'>
                                        <circle
                                            className='hmmx'
                                            r='20'
                                            cy='50'
                                            cx='50'
                                        ></circle>
                                    </svg>
                                    <span className='font-bold'>
                                        Verifying...
                                    </span>
                                </div>
                            ) : (
                                <div className='flex gap-2 justify-center items-center'>
                                    <CircleArrowRight />{" "}
                                    <strong>Continue</strong>
                                </div>
                            )}
                        </button>
                    </div>
                );
            case 4:
                return (
                    <div className=''>
                        <h2 className='mb-8 mt-3 text-[20px] text-center font-bold'>
                            Change Your Password
                        </h2>

                        <div className='relative'>
                            <label className='block text-foreground font-semibold mb-1 text-[14px] ml-1'>
                                New Password
                            </label>
                            <input
                                type={showPass ? "password" : "text"}
                                className='w-full px-3 pr-10 py-2 outline-none rounded-md bg-backgroundtwo'
                                value={newPassword}
                                placeholder='strong pass...'
                                onChange={e => setNewPassword(e.target.value)}
                                onFocus={() => setPassIns(true)}
                                onBlur={() => setPassIns(false)}
                                required
                            />

                            <div
                                onClick={() => {
                                    setShowPass(prev => !prev);
                                }}
                                className='absolute right-2 top-[33px] cursor-pointer'
                            >
                                {showPass ? <Eye /> : <EyeOff />}
                            </div>

                            {passIns && (
                                <div className='absolute p-2 rounded-lg top-[-86px] right-2 h-[118px] bg-[#484848] flex flex-col gap-1'>
                                    <p
                                        className={`flex text-[9px] gap-1 ${oneUpperCase
                                                ? "text-foreground"
                                                : "text-[#888888]"
                                            }`}
                                    >
                                        <CircleCheck
                                            className={`
                                        ${oneUpperCase ? "text-[#08ff40]" : ""}
                                        `}
                                            size={14}
                                        />{" "}
                                        <span>
                                            Atleast 1 uppercase letter (eg: A,
                                            B)
                                        </span>
                                    </p>

                                    <p
                                        className={`flex text-[9px] gap-1
                                    ${oneLowerCase
                                                ? "text-foreground"
                                                : "text-[#888888]"
                                            }
                                    `}
                                    >
                                        <CircleCheck
                                            className={`
                                        ${oneLowerCase ? "text-[#08ff40]" : ""}
                                        `}
                                            size={14}
                                        />{" "}
                                        <span>
                                            Atleast 1 lowercase letter (eg: a,
                                            b)
                                        </span>
                                    </p>

                                    <p
                                        className={`flex text-[9px] gap-1
                                    ${oneNumber
                                                ? "text-foreground"
                                                : "text-[#888888]"
                                            }
                                    `}
                                    >
                                        <CircleCheck
                                            className={`
                                        ${oneNumber ? "text-[#08ff40]" : ""}
                                        `}
                                            size={14}
                                        />{" "}
                                        <span>Atleast 1 number (eg: 1, 2)</span>
                                    </p>

                                    <p
                                        className={`flex text-[9px] gap-1
                                    ${oneSpecial
                                                ? "text-foreground"
                                                : "text-[#888888]"
                                            }
                                    `}
                                    >
                                        <CircleCheck
                                            className={`
                                        ${oneSpecial ? "text-[#08ff40]" : ""}
                                        `}
                                            size={14}
                                        />{" "}
                                        <span>
                                            Atleast 1 special cherecter (eg: @,
                                            $)
                                        </span>
                                    </p>
                                    <p
                                        className={`flex text-[9px] gap-1
                                    ${sevenCher
                                                ? "text-foreground"
                                                : "text-[#888888]"
                                            }
                                    `}
                                    >
                                        <CircleCheck
                                            className={`
                                        ${sevenCher ? "text-[#08ff40]" : ""}
                                        `}
                                            size={14}
                                        />{" "}
                                        <span>
                                            Must contain at least 7 characters
                                        </span>
                                    </p>
                                    <p
                                        className={`flex text-[9px] gap-1
                                    ${noRandomCher
                                                ? "text-foreground"
                                                : "text-[#888888]"
                                            }
                                    `}
                                    >
                                        <CircleCheck
                                            className={`
                                        ${noRandomCher ? "text-[#08ff40]" : ""}
                                        `}
                                            size={14}
                                        />{" "}
                                        <span>
                                            No random cherecters (eg: :, ?)
                                        </span>
                                    </p>
                                </div>
                            )}

                            <div className='flex gap-1 mt-1 px-1.5'>
                                <div
                                    className={`h-2 rounded-full flex-1 ${passStrength > 0
                                            ? "bg-red-500"
                                            : "bg-[#484848]"
                                        }`}
                                ></div>
                                <div
                                    className={`h-2 rounded-full flex-1 ${passStrength > 1
                                            ? "bg-orange-400"
                                            : "bg-[#484848]"
                                        }`}
                                ></div>
                                <div
                                    className={`h-2 rounded-full flex-1 ${passStrength > 2
                                            ? "bg-yellow-300"
                                            : "bg-[#484848]"
                                        }`}
                                ></div>
                                <div
                                    className={`h-2 rounded-full flex-1 ${passStrength > 3
                                            ? "bg-blue-300"
                                            : "bg-[#484848]"
                                        }`}
                                ></div>
                                <div
                                    className={`h-2 rounded-full flex-1 ${passStrength > 4
                                            ? "bg-green-500"
                                            : "bg-[#484848]"
                                        }`}
                                ></div>
                            </div>
                            <p className='text-right mr-2 text-[12px] font-semibold'>
                                {passStrengthText}
                            </p>
                        </div>

                        <p className='font-semibold ml-1 mt-4'>
                            Confirm New Password
                        </p>
                        <input
                            type={showPass ? "password" : "text"}
                            placeholder='strong pass...'
                            className='w-full p-2 rounded mb-4 outline-none bg-backgroundtwo'
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                        <button
                            onClick={handleStep4}
                            disabled={
                                loading ||
                                !newPassword ||
                                !confirmPassword ||
                                newPassword !== confirmPassword
                            }
                            className='bg-main text-white p-2 rounded w-full disabled:bg-[#a53d3d]'
                        >
                            {loading ? (
                                <div className='flex gap-2 justify-center items-center'>
                                    <svg className='idk' viewBox='25 25 50 50'>
                                        <circle
                                            className='hmmx'
                                            r='20'
                                            cy='50'
                                            cx='50'
                                        ></circle>
                                    </svg>
                                    <span className='font-bold'>
                                        Verifying...
                                    </span>
                                </div>
                            ) : (
                                <div className='flex gap-2 justify-center items-center'>
                                    <CircleArrowRight />{" "}
                                    <strong>Change Password</strong>
                                </div>
                            )}
                        </button>
                    </div>
                );
            case 5:
                return (
                    <div className='text-center space-y-4 py-14'>
                        <CheckCircle className='w-16 h-16 text-green-500 mx-auto' />
                        <h2 className='text-xl font-bold'>
                            Password Changed Successfully!
                        </h2>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className='p-2 bg-background'>
            <div className='flex justify-between mb-8'>
                {steps.map((step, index) => (
                    <div
                        key={step}
                        className={`flex-1 text-center flex justify-center items-center border-b-2 pb-2 ${index + 1 === currentStep
                                ? "border-main font-bold"
                                : "border-foreground"
                            }`}
                    >
                        <div className='bg-foreground rounded-full text-background px-2'>
                            {step}
                        </div>
                    </div>
                ))}
            </div>

            <div className='flex justify-between mb-4'>
                <button
                    onClick={() => setCurrentStep(p => p - 1)}
                    disabled={currentStep === 1 || loading}
                    className='text-foreground font-bold disabled:text-gray-400 disabled:font-[400]'
                >
                    Previous
                </button>
                <span className='text-foreground'>
                    Step <strong>{currentStep}</strong> of {steps.length}
                </span>
                <button
                    disabled={!completedSteps[currentStep] || loading}
                    className='text-foreground font-bold disabled:text-gray-400 disabled:font-[400]'
                >
                    Next
                </button>
            </div>

            {renderStep()}
        </div>
    );
};

export default ForgotPasswordFlow;

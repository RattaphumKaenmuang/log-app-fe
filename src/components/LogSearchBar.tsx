import { useState } from 'react';
import Select, { type MultiValue } from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import type { User } from '../types/user';
import { getDefaultEndDate, getDefaultStartDate } from '../services/date.service';

interface OptionType {
    value: string;
    label: string;
}

interface LogSearchBarProps {
    users: User[];
    onActionsChange:        (actions: string[]) => void
    onUsersChange:          (userIds: string[]) => void
    onStartDateChange:      (startDate: Date) => void
    onEndDateChange:        (endDate: Date) => void
    onStatusCodeChange:     (statusCode: string) => void
    onLabnumberChange:      (labnumber: string) => void
    onLowerResTimeChange:   (lowerResTime: number) => void
    onUpperResTimeChange:   (upperResTime: number) => void
}

function LogSearchBar({
    users = [],
    onActionsChange,
    onUsersChange,
    onStartDateChange,
    onEndDateChange,
    onStatusCodeChange,
    onLabnumberChange,
    onLowerResTimeChange,
    onUpperResTimeChange,
} : LogSearchBarProps) {
    const [selectedUsers, setSelectedUsers] = useState<MultiValue<OptionType>>([
        { value: '', label: 'แสดงทั้งหมด' }
    ]);
    const [selectedAction, setSelectedAction] = useState<MultiValue<OptionType>>([
        { value: '', label: 'แสดงทั้งหมด' }
    ]);

    const handleActionDropdown = (newValue: MultiValue<OptionType>) => {
        const showAllOption = actionOptions.find(opt => opt.value === '');
        const hasShowAll = newValue.some(opt => opt.value === '');
        const previousHadShowAll = selectedAction.some(opt => opt.value === '');

        let finalValue: MultiValue<OptionType>;
        if (hasShowAll && !previousHadShowAll) {
            finalValue = [showAllOption!];
            setSelectedAction(finalValue);
        } else if (hasShowAll && newValue.length > 1) {
            finalValue = newValue.filter(opt => opt.value !== '');
            setSelectedAction(finalValue);
        } else {
            finalValue = newValue;
            setSelectedAction(finalValue);
        }
        onActionsChange(finalValue.map(opt => opt.value).filter(val => val !== ''));
    };

    const handleUserDropdown = (newValue: MultiValue<OptionType>) => {
        const showAllOption = userOptions.find(opt => opt.value === '');
        const hasShowAll = newValue.some(opt => opt.value === '');
        const previousHadShowAll = selectedUsers.some(opt => opt.value === '');

        let finalValue: MultiValue<OptionType>;
        if (hasShowAll && !previousHadShowAll) {
            finalValue = [showAllOption!];
            setSelectedUsers(finalValue);
        } else if (hasShowAll && newValue.length > 1) {
            finalValue = newValue.filter(opt => opt.value !== '');
            setSelectedUsers(finalValue);
        } else {
            finalValue = newValue;
            setSelectedUsers(finalValue);
        }
        onUsersChange(finalValue.map(opt => opt.value).filter(val => val !== ''));
    };

    const [startDate, setStartDate] = useState<Date | null>(getDefaultStartDate());
    const [endDate, setEndDate] = useState<Date | null>(getDefaultEndDate());
    const [statusCode, setStatusCode] = useState<string>('');
    const [labNumber, setLabNumber] = useState<string>('');
    const [lowerResTime, setLowerResTime] = useState<number>(0);
    const [upperResTime, setUpperResTime] = useState<number>(999999);

    const userOptions: OptionType[] = [
        ...users.map(user => ({
            value: user._id,
            label: `${user.prefix} ${user.firstname} ${user.lastname}`
        })),
        { value: '', label: 'แสดงทั้งหมด' }
    ];

    const actionOptions: OptionType[] = [
        { value: 'labOrder', label: 'labOrder' },
        { value: 'labResult', label: 'labResult' },
        { value: 'receive', label: 'receive' },
        { value: 'accept', label: 'accept' },
        { value: 'approve', label: 'approve' },
        { value: 'reapprove', label: 'reapprove' },
        { value: 'unapprove', label: 'unapprove' },
        { value: 'unreceive', label: 'unreceive' },
        { value: 'rerun', label: 'rerun' },
        { value: 'save', label: 'save' },
        { value: 'listTransactions', label: 'listTransactions' },
        { value: 'getTransaction', label: 'getTransaction' },
        { value: 'analyzerResult', label: 'analyzerResult' },
        { value: 'analyzerRequest', label: 'analyzerRequest' },
        { value: '', label: 'แสดงทั้งหมด' }
    ];

    // Clear handler
    const handleClear = () => {
        const defaultUser = [{ value: '', label: 'แสดงทั้งหมด' }];
        const defaultAction = [{ value: '', label: 'แสดงทั้งหมด' }];
        setSelectedUsers(defaultUser);
        setSelectedAction(defaultAction);
        setStartDate(getDefaultStartDate());
        setEndDate(getDefaultEndDate());
        setStatusCode('');
        setLabNumber('');
        setLowerResTime(0);
        setUpperResTime(999999);

        onUsersChange([]);
        onActionsChange([]);
        onStartDateChange(getDefaultStartDate());
        onEndDateChange(getDefaultEndDate());
        onStatusCodeChange('');
        onLabnumberChange('');
        onLowerResTimeChange(0);
        onUpperResTimeChange(999999);
    };

    return (
        <div className="w-[88vw] mb-3 bg-white text-gray-700 rounded-xl p-4 mt-2 relative z-30">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <fieldset className="border border-gray-300 rounded px-3 py-1">
                    <legend className="text-sm font-medium px-1">User</legend>
                    <Select<OptionType, true>
                        isMulti
                        options={userOptions}
                        value={selectedUsers}
                        onChange={(newValue) => handleUserDropdown(newValue)}
                        placeholder="Select users..."
                        classNamePrefix="react-select"
                        styles={{
                            control: (base) => ({
                                ...base,
                                border: 'none',
                                boxShadow: 'none'
                            })
                        }}
                    />
                </fieldset>
                
                <fieldset className="border border-gray-300 rounded px-3 py-1">
                    <legend className="text-sm font-medium px-1">Action</legend>
                    <Select<OptionType, true>
                        isMulti
                        options={actionOptions}
                        value={selectedAction}
                        onChange={(newValue) => handleActionDropdown(newValue)}
                        placeholder="Select status..."
                        
                        classNamePrefix="react-select"
                        styles={{
                            control: (base) => ({
                                ...base,
                                border: 'none',
                                boxShadow: 'none'
                            })
                        }}
                    />
                </fieldset>
                
                <fieldset className="border border-gray-300 rounded px-3 py-2">
                    <legend className="text-sm font-medium px-1">Status Code</legend>
                    <input 
                        type="text" 
                        placeholder="Enter Status Code" 
                        className="outline-none w-full"
                        value={statusCode}
                        onChange={(e) => {
                            setStatusCode(e.target.value);
                            onStatusCodeChange(e.target.value);
                        }}
                    />
                </fieldset>
                
                <fieldset className="border border-gray-300 rounded px-3 py-2">
                    <legend className="text-sm font-medium px-1">Lab Number</legend>
                    <input 
                        type="text" 
                        placeholder="Enter Lab Number" 
                        className="outline-none w-full"
                        value={labNumber}
                        onChange={(e) => {
                            setLabNumber(e.target.value);
                            onLabnumberChange(e.target.value);
                        }}
                    />
                </fieldset>
                
                <fieldset className="border border-gray-300 rounded px-3 py-2 relative">
                    <legend className="text-sm font-medium px-1">Start Date</legend>
                    <DatePicker
                        selected={startDate}
                        onChange={(date: Date | null) => {
                            setStartDate(date);
                            if (date) onStartDateChange(date);
                        }}
                        // showTimeSelect
                        showTimeInput
                        timeFormat="HH:mm"
                        timeIntervals={1}
                        dateFormat="MMMM d, yyyy HH:mm"
                        placeholderText="Select start date & time"
                        className="outline-none w-full"
                        maxDate={endDate || undefined}
                        withPortal
                        showYearDropdown
                        showMonthDropdown
                        dropdownMode="select"
                    />
                </fieldset>

                <fieldset className="border border-gray-300 rounded px-3 py-2 relative">
                    <legend className="text-sm font-medium px-1">End Date</legend>
                    <DatePicker
                        selected={endDate}
                        onChange={(date: Date | null) => {
                            setEndDate(date);
                            if (date) onEndDateChange(date);
                        }}
                        // showTimeSelect
                        showTimeInput
                        timeFormat="HH:mm"
                        timeIntervals={1}
                        dateFormat="MMMM d, yyyy HH:mm"
                        placeholderText="Select end date & time"
                        className="outline-none w-full"
                        minDate={startDate || undefined}
                        withPortal
                        showYearDropdown
                        showMonthDropdown
                        dropdownMode="select"
                    />
                </fieldset>

                <fieldset className="border border-gray-300 rounded px-3 py-2">
                    <legend className="text-sm font-medium px-1">Min Response Time</legend>
                    <input 
                        type="number" 
                        placeholder="ms" 
                        className="outline-none w-full" 
                        min="0" 
                        value={lowerResTime}
                        onChange={(e) => {
                            const value = parseInt(e.target.value) || 0;
                            setLowerResTime(value);
                            onLowerResTimeChange(value);
                        }}
                    />
                </fieldset>

                <fieldset className="border border-gray-300 rounded px-3 py-2">
                    <legend className="text-sm font-medium px-1">Max Response Time</legend>
                    <input 
                        type="number" 
                        placeholder="ms" 
                        className="outline-none w-full" 
                        max="999999"
                        value={upperResTime}
                        onChange={(e) => {
                            const value = parseInt(e.target.value) || 999999;
                            setUpperResTime(value);
                            onUpperResTimeChange(value);
                        }}
                    />
                </fieldset>
            </div>

            <div className="flex gap-2">    
                <button
                    type="button"
                    className="flex-1 py-2 bg-gray-200 text-gray-700 border border-gray-300 rounded-md 
                                   hover:bg-gray-300 hover:cursor-pointer transition-colors duration-150 font-semibold"
                    onClick={handleClear}
                >
                    Clear
                </button>
                <button className="flex-1 py-2 bg-green-600 text-white rounded-md 
                                   hover:bg-green-700 hover:cursor-pointer transition-colors duration-150 font-semibold"
                    type="button"
                >
                    Submit
                </button>
            </div>
        </div>
    )
}

export default LogSearchBar;
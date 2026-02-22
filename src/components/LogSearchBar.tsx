import { useState } from 'react';
import Select, { type MultiValue } from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import type { User } from '../types/user';

interface OptionType {
    value: string;
    label: string;
}

interface LogSearchBarProps {
    users: User[];
}

function LogSearchBar({users = []} : LogSearchBarProps) {
    const [selectedUsers, setSelectedUsers] = useState<MultiValue<OptionType>>([]);
    const [selectedAction, setselectedAction] = useState<MultiValue<OptionType>>([
        { value: '', label: 'แสดงทั้งหมด' }
    ]);

    const getDefaultStartDate = () => {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        return date;
    };
    
    const getDefaultEndDate = () => {
        const date = new Date();
        date.setHours(23, 59, 59, 999);
        return date;
    };

    const handleActionChange = (newValue: MultiValue<OptionType>) => {
        const showAllOption = actionOptions.find(opt => opt.value === '');
        const hasShowAll = newValue.some(opt => opt.value === '');
        const previousHadShowAll = selectedAction.some(opt => opt.value === '');

        if (hasShowAll && !previousHadShowAll) {
            setselectedAction([showAllOption!]);
        } else if (hasShowAll && newValue.length > 1) {
            setselectedAction(newValue.filter(opt => opt.value !== ''));
        } else {
            setselectedAction(newValue);
        }
    };

    const [startDate, setStartDate] = useState<Date | null>(getDefaultStartDate());
    const [endDate, setEndDate] = useState<Date | null>(getDefaultEndDate());

    const userOptions: OptionType[] = users.map(user => ({
        value: user._id,
        label: `${user.prefix} ${user.firstname} ${user.lastname}`
    }));

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

    return (
        <div className="w-[88vw] mb-3 bg-white text-gray-700 rounded-xl p-4 mt-2 relative z-30">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <fieldset className="border border-gray-300 rounded px-3 py-1">
                    <legend className="text-sm font-medium px-1">User</legend>
                    <Select<OptionType, true>
                        isMulti
                        options={userOptions}
                        value={selectedUsers}
                        onChange={(newValue) => setSelectedUsers(newValue)}
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
                        onChange={(newValue) => handleActionChange(newValue)}
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
                    <input type="text" placeholder="Enter Status Code" className="outline-none w-full" />
                </fieldset>
                
                <fieldset className="border border-gray-300 rounded px-3 py-2">
                    <legend className="text-sm font-medium px-1">Lab Number</legend>
                    <input type="text" placeholder="Enter Lab Number" className="outline-none w-full" />
                </fieldset>
                
                <fieldset className="border border-gray-300 rounded px-3 py-2 relative">
                    <legend className="text-sm font-medium px-1">Start Date</legend>
                    <DatePicker
                        selected={startDate}
                        onChange={(date: Date | null) => setStartDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={1}
                        dateFormat="MMMM d, yyyy HH:mm"
                        placeholderText="Select start date & time"
                        className="outline-none w-full"
                        maxDate={endDate || undefined}
                        withPortal
                    />
                </fieldset>

                <fieldset className="border border-gray-300 rounded px-3 py-2 relative">
                    <legend className="text-sm font-medium px-1">End Date</legend>
                    <DatePicker
                        selected={endDate}
                        onChange={(date: Date | null) => setEndDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={1}
                        dateFormat="MMMM d, yyyy HH:mm"
                        placeholderText="Select end date & time"
                        className="outline-none w-full"
                        minDate={startDate || undefined}
                        withPortal
                    />
                </fieldset>

                <fieldset className="border border-gray-300 rounded px-3 py-2">
                    <legend className="text-sm font-medium px-1">Min Response Time</legend>
                    <input type="number" placeholder="ms" className="outline-none w-full" min="0" defaultValue="0" />
                </fieldset>

                <fieldset className="border border-gray-300 rounded px-3 py-2">
                    <legend className="text-sm font-medium px-1">Max Response Time</legend>
                    <input type="number" placeholder="ms" className="outline-none w-full" max="999999" defaultValue="999999" />
                </fieldset>
            </div>

            <div className="flex gap-2">    
                <button className="flex-1 py-2 bg-gray-200 text-gray-700 border border-gray-300 rounded-md 
                                   hover:bg-gray-300 hover:cursor-pointer transition-colors duration-150 font-semibold">
                    Clear
                </button>
                <button className="flex-1 py-2 bg-green-600 text-white rounded-md 
                                   hover:bg-green-700 hover:cursor-pointer transition-colors duration-150 font-semibold">
                    Submit
                </button>
            </div>
        </div>
    )
}

export default LogSearchBar;
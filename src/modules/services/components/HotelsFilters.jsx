import { DateRangePicker, Input } from "@nextui-org/react"

const HotelsFilters = ({ children }) => {
    return (
        <div>

            <div className="flex gap-5 mb-4 ml-2" >
                <Input
                    label="Search by hotel name"
                    // defaultValue="Search by hotel name"
                    className="max-w-xs"
                />
                <DateRangePicker
                    label="Stay duration"
                    className="max-w-xs"
                />
            </div>
            {children}
        </div>
    )
}

export default HotelsFilters

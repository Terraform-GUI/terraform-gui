import {useCallback, useState} from "react";
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import {IArgumentNodeData} from "../../../interfaces/IArgumentNodeData";

interface ArgumentProps {
    argument: IArgumentNodeData
    onArgumentUpdate: (argumentName: string, argumentValue: any) => void
}

export function Argument(props: ArgumentProps) {
    const {argument:{type, defaultValue, name, values, min, max, value}, onArgumentUpdate} = props;
    const [inputValue, setInputValue] = useState<any>(value ?? defaultValue);
    const [errorMessage, setErrorMessage] = useState<null|string>();

    const onChange = useCallback((value: any) => {
        setInputValue(value);

        if (isValueValid(value)) {
            onArgumentUpdate(name, value);
        }
    }, []);

    const isValueValid = (value: any): boolean => {
        switch (type) {
            case "string":
                if (max != null && value.length > parseInt(max)) {
                    setErrorMessage('Value is over max length');
                    return false;
                }
                if (min != null && value.length > parseInt(min)) {
                    setErrorMessage('Value is below min length');
                    return false;
                }
                break;
            case 'number':
                const isNumber = new RegExp(/^-?\d*\.?\d+$/);
                if (!isNumber.test(value) && value != '') {
                    setErrorMessage('Value must be a number');
                    return false;
                }
                value = parseInt(value);
                if (max != null && value > max) {
                    setErrorMessage(`Maximum value is ${value}`);
                    return false;
                }
                if (min != null && value < min) {
                    setErrorMessage(`Minimum value is ${value}`);
                    return false;
                }
                break;
        }

        setErrorMessage(null);
        return true;
    }

    if (type == 'string') {
        return (
            <>
                <TextField
                    autoFocus
                    margin="dense"
                    id={name}
                    label={name}
                    type="text"
                    fullWidth
                    variant="standard"
                    style={{color: errorMessage ? '#ff0000' : 'inherit', margin: '10px 0'}}
                    onChange={(evt) => onChange(evt.target.value)}
                    value={inputValue}
                    error={errorMessage != null}
                    helperText={errorMessage}
                />
            </>
        )
    }

    if (type == 'select') {
        return (
            <>
                <FormControl fullWidth style={{margin: '10px 0'}}>
                    <InputLabel id={name}>{name}</InputLabel>
                    <Select
                        labelId={name}
                        id={name}
                        value={inputValue}
                        label={name}
                        onChange={(evt) => onChange(evt.target.value)}
                    >
                        {values.map((value: string, index: number) => (
                            <MenuItem value={value} key={index} selected={value == defaultValue}>{value}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </>
        )
    }

    if (type == 'bool') {
        return (
            <>
                <FormGroup style={{margin: '10px 0'}}>
                    <FormControlLabel control={<Checkbox checked={inputValue} onChange={(evt) => onChange(evt.target.checked)}/>} label={name} />
                </FormGroup>
            </>
        )
    }

    if (type == 'number') {
        return (
            <>
                <TextField
                    autoFocus
                    margin="dense"
                    id={name}
                    label={name}
                    type="number"
                    fullWidth
                    variant="standard"
                    style={{color: errorMessage ? '#ff0000' : 'inherit', margin: '10px 0'}}
                    value={inputValue}
                    error={errorMessage != null}
                    helperText={errorMessage}
                    onChange={(evt) => onChange(evt.target.value)}
                />
            </>
        )
    }

    return (
        <>
        </>
    )
}
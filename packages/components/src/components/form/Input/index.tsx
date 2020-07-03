import * as React from 'react';
import styled, { css } from 'styled-components';
import FluidSpinner from '../../loaders/FluidSpinner';
import { Icon } from '../../Icon';
import { colors, variables } from '../../../config';
import { InputState, InputVariant, InputButton, TextAlign } from '../../../support/types';
import { getStateColor } from '../../../utils';

interface WrappedProps {
    width?: any;
}

const Wrapper = styled.div<WrappedProps>`
    display: inline-flex;
    flex-direction: column;
    width: ${props => (props.width ? `${props.width}px` : '100%')};
`;

const StyledInput = styled.input<Props>`
    font-family: ${variables.FONT_FAMILY.TTHOVES};
    font-weight: ${variables.FONT_WEIGHT.MEDIUM};
    padding: 1px 16px 0 16px; /* 2px from top = input height should be 36px and 48px  */
    font-size: ${variables.FONT_SIZE.SMALL};
    border-radius: 4px;
    border: solid 2px ${props =>
        props.state ? getStateColor(props.state) : colors.NEUE_STROKE_GREY};
    background-color: ${colors.WHITE};
    outline: none;
    box-sizing: border-box;
    width: 100%;
    height: ${props => (props.variant === 'small' ? '30px' : '48px')};
    text-align: ${props => props.align || 'left'};
    color: ${props => getStateColor(props.state)};

    &:read-only {
        background: ${colors.BLACK96};
        box-shadow: none;
        color: ${colors.BLACK50};
    }

    ${props =>
        props.monospace &&
        css`
            /* same width nums, slashed zero */
            font-variant-numeric: slashed-zero tabular-nums;
        `}

    ${props =>
        props.disabled &&
        css`
            background: ${colors.BLACK96};
            box-shadow: none;
            color: ${colors.BLACK50};
            cursor: default;
        `}

    ${props =>
        !props.disabled &&
        !props.state &&
        !props.readOnly &&
        css`
            &:hover,
            &:focus,
            &:active {
                /* border-color: ${colors.BLACK50}; */
            }
        `}
`;

const InputWrapper = styled.div`
    display: flex;
    position: relative;
`;

const InputIconWrapper = styled.div<Props>`
    position: absolute;
    top: 1px;
    bottom: 1px;
    display: flex;
    align-items: center;
    z-index: 2;

    ${props =>
        props.align === 'left' &&
        css`
            right: 10px;
        `}

    ${props =>
        props.align === 'right' &&
        css`
            left: 10px;
        `}
`;

const SpinnerWrapper = styled.div``;

const Label = styled.label`
    min-height: 24px;
    font-size: ${variables.FONT_SIZE.NORMAL};
    font-weight: ${variables.FONT_WEIGHT.MEDIUM};
    padding: 0 0 12px 0;
    color: ${colors.NEUE_TYPE_DARK_GREY};
`;

const BottomText = styled.div<Props>`
    padding: 10px 10px 0 10px;
    min-height: 27px;
    font-size: 12px;
    color: ${props => getStateColor(props.state)};
`;

const Button = styled.button<{ disabled?: boolean }>`
    font-family: ${variables.FONT_FAMILY.TTHOVES};
    font-size: ${variables.FONT_SIZE.SMALL};
    font-weight: ${variables.FONT_WEIGHT.MEDIUM};
    color: ${colors.BLACK25};
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    padding: 0 0 0 5px;
    background: ${colors.WHITE};

    ${props =>
        !props.disabled &&
        css`
            cursor: pointer;

            &:hover {
                color: ${colors.BLACK0};
            }
        `}

    ${props =>
        props.disabled &&
        css`
            opacity: 0.7;
        `}
`;

const ButtonText = styled.div`
    font-size: 14px;
    font-weight: 500;
    height: 14px;
    line-height: 16px;
`;

const StyledIcon = styled(Icon)`
    margin-right: 5px;
`;

const Overlay = styled.div<Props>`
    bottom: 1px;
    top: 1px;
    left: 1px;
    right: 1px;
    border: 1px solid transparent;
    border-radius: 3px;
    position: absolute;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 1) 220px);
    z-index: 1;
`;

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    innerRef?: React.Ref<HTMLInputElement>;
    variant?: InputVariant;
    button?: InputButton;
    topLabel?: React.ReactNode;
    bottomText?: React.ReactNode;
    monospace?: boolean;
    isDisabled?: boolean;
    autoComplete?: string;
    autoCorrect?: string;
    autoCapitalize?: string;
    spellCheck?: boolean;
    isLoading?: boolean;
    dataTest?: string;
    isPartiallyHidden?: boolean;
    wrapperProps?: Record<string, any>;
    type?: string;
    state?: InputState;
    align?: TextAlign;
    noError?: boolean;
}

const Input = ({
    type = 'text',
    innerRef,
    state,
    variant = 'large',
    width,
    button,
    topLabel,
    bottomText,
    isDisabled,
    autoComplete = 'off',
    autoCorrect = 'off',
    autoCapitalize = 'off',
    monospace,
    wrapperProps,
    isLoading,
    dataTest,
    isPartiallyHidden,
    align = 'left',
    noError = false,
    ...rest
}: Props) => {
    const [buttonHover, setButtonHover] = React.useState(false);
    const handleButtonEnter = () => {
        setButtonHover(true);
    };
    const handleButtonLeave = () => {
        setButtonHover(false);
    };

    return (
        <Wrapper width={width} {...wrapperProps} data-test={dataTest}>
            {topLabel && <Label>{topLabel}</Label>}
            <InputWrapper>
                <InputIconWrapper align={align}>
                    {isLoading && (
                        <SpinnerWrapper>
                            <FluidSpinner size={16} color={colors.GREEN} />
                        </SpinnerWrapper>
                    )}
                    {button && (
                        <>
                            <Button
                                onClick={button.onClick}
                                onMouseEnter={handleButtonEnter}
                                onMouseLeave={handleButtonLeave}
                                disabled={button.isDisabled}
                            >
                                {button.icon && (
                                    <StyledIcon
                                        icon={button.icon}
                                        size={button.iconSize || 10}
                                        color={
                                            buttonHover
                                                ? button.iconColorHover || colors.BLACK0
                                                : button.iconColor || colors.BLACK25
                                        }
                                    />
                                )}
                                {button.text && <ButtonText>{button.text}</ButtonText>}
                            </Button>
                        </>
                    )}
                </InputIconWrapper>
                {isPartiallyHidden && <Overlay />}
                <StyledInput
                    type={type}
                    autoComplete={autoComplete}
                    autoCorrect={autoCorrect}
                    autoCapitalize={autoCapitalize}
                    spellCheck={false}
                    state={state}
                    variant={variant}
                    disabled={isDisabled}
                    width={width}
                    monospace={monospace}
                    align={align}
                    ref={innerRef}
                    data-lpignore="true"
                    {...rest}
                />
            </InputWrapper>
            {!noError && <BottomText state={state}>{bottomText}</BottomText>}
        </Wrapper>
    );
};

export { Input, Props as InputProps };

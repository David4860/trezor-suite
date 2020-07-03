import React from 'react';
import styled from 'styled-components';
import { variables, colors } from '@trezor/components';
import { useSendFormContext } from '@wallet-hooks';
import { formatNetworkAmount } from '@wallet-utils/accountUtils';
import { Card, Translation, FiatValue } from '@suite-components';

const StyledCard = styled(Card)`
    display: flex;
    flex-direction: row;
    justify-items: space-between;
    align-items: center;
    min-height: 86px;
`;

const Left = styled.div`
    display: flex;
    flex: 1;
    font-weight: ${variables.FONT_WEIGHT.MEDIUM};
`;

const Label = styled.div`
    padding-right: 10px;
    text-transform: capitalize;
    font-size: ${variables.FONT_SIZE.NORMAL};
    color: ${colors.NEUE_TYPE_DARK_GREY};
`;

const SecondaryLabel = styled.div`
    padding-top: 2px;
    font-size: ${variables.FONT_SIZE.SMALL};
    color: ${colors.NEUE_TYPE_LIGHT_GREY};
`;

const Right = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    flex-direction: column;
    align-items: flex-end;
`;

const TotalSentCoin = styled.div`
    display: flex;
    font-weight: ${variables.FONT_WEIGHT.MEDIUM};
    font-size: ${variables.FONT_SIZE.NORMAL};
    color: ${colors.NEUE_TYPE_DARK_GREY};
    padding-bottom: 6px;
`;

const Symbol = styled.div`
    text-transform: uppercase;
    padding-left: 4px;
`;

const TotalSentFiat = styled.div`
    display: flex;
    font-weight: ${variables.FONT_WEIGHT.MEDIUM};
    font-size: ${variables.FONT_SIZE.NORMAL};
    color: ${colors.NEUE_TYPE_LIGHT_GREY};
`;

export default () => {
    const {
        account: { symbol },
        transactionInfo,
    } = useSendFormContext();

    return (
        <StyledCard>
            <Left>
                <Label>
                    <Translation id="TR_TOTAL_SENT" />
                </Label>
                <SecondaryLabel>
                    <Translation id="TR_INCLUDING_FEE" />
                </SecondaryLabel>
            </Left>
            {transactionInfo && (
                <Right>
                    <TotalSentCoin>
                        {formatNetworkAmount(transactionInfo.totalSent, symbol)}
                        <Symbol>{symbol}</Symbol>
                    </TotalSentCoin>
                    <TotalSentFiat>
                        <FiatValue
                            amount={formatNetworkAmount(transactionInfo.totalSent, symbol)}
                            symbol={symbol}
                        />
                    </TotalSentFiat>
                </Right>
            )}
        </StyledCard>
    );
};

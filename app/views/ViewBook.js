import React, {Component} from 'react';
import {StyleSheet, Text, View, StatusBar, Image} from 'react-native';
import {
  Header,
  Left,
  Body,
  Right,
  Subtitle,
  Button,
  Icon,
  Title,
} from 'native-base';

import styled from 'styled-components/native';
import {colors, metrics} from '../styles';

const Container = styled.SafeAreaView`
  padding-vertical: ${metrics.basePadding}px;
  flex: 1;
`;

const BookWrapper = styled.View`
  padding: ${metrics.basePadding}px;
  padding-bottom: ${metrics.basePadding * 1.5}px;
  background-color: ${colors.primary};
  flex-direction: row;
`;

const ThumbnailWrapper = styled.View`
  flex-direction: column;
  padding-right: ${metrics.basePadding}px;
  width: ${100 + metrics.basePadding}px;
`;

const Thumbnail = styled.View`
  box-shadow: 0px 15px 20px rgba(184, 118, 12, 0.8);
  height: 130px;
  max-width: 100%;
`;

const Pages = styled.Text`
  font-family: 'Roboto';
  font-size: 14px;
  color: ${colors.light};
  margin-top: 30px;
  text-align: center;
`;

const InfoWrapper = styled.View`
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

const BookTitle = styled.Text`
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: bold;
  color: ${colors.black};
`;

const Author = styled.Text`
  font-family: 'Roboto';
  font-size: 14px;
  color: ${colors.light};
  margin-top: ${metrics.baseMargin / 2}px;
`;

const PriceWrapper = styled.View`
  margin-top: ${metrics.baseMargin * 2}px;
  flex-direction: row;
  align-items: center;
`;

const Price = styled.Text`
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: bold;
  color: ${colors.black};
  margin-right: ${metrics.baseMargin}px;
`;

const Rating = styled.View`
  justify-content: center;
  flex-direction: row;
`;

const ButtonsWrapper = styled.View`
  margin-top: ${metrics.basePadding * 1.5}px;
  flex-direction: row;
  justify-content: flex-end;
`;

const BuyButton = styled.TouchableOpacity`
  background-color: ${colors.secondary};
  width: 116px;
  height: 36px;
  border-radius: 18px;
  box-shadow: 0px 7px 15px rgba(60, 120, 191, 0.422639);
  justify-content: center;
  align-items: center;
`;

const BuyButtonText = styled.Text`
  font-family: 'Roboto';
  text-transform: uppercase;
  color: ${colors.white};
  font-size: 13px;
  font-weight: bold;
`;

const LikeButton = styled.TouchableOpacity`
  background-color: ${colors.tertiary};
  width: 36px;
  height: 36px;
  border-radius: 18px;
  justify-content: center;
  align-items: center;
  margin-left: ${metrics.baseMargin}px;
`;

const DescriptionWrapper = styled.ScrollView`
  padding-horizontal: ${metrics.basePadding}px;
`;

const Description = styled.Text`
  padding-top: ${metrics.basePadding * 1.5}px;
  padding-bottom: ${metrics.basePadding}px;
  font-family: 'Roboto';
  font-size: 14px;
  font-weight: normal;
  color: ${colors.gray};
  line-height: 30px;
`;

export default class ViewBook extends Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    this.state = {
      bId: navigation.state.params.bId,
      dataSource: [],
    };
  }

  componentDidMount() {
    fetch('http://192.168.1.136:3003/book/' + this.state.bId)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson,
        });
      });
  }

  addBooktoUserLibrary() {}

  render() {
    const bookItem = this.state.dataSource;
    console.log(bookItem);
    return (
      <Container>
        <BookWrapper>
          <ThumbnailWrapper>
            <Thumbnail>
              <Image source={{uri: bookItem.cover}} style={styles.thumbnail} />
            </Thumbnail>
            <Pages>
              {bookItem.page}
              {' pages'}
            </Pages>
          </ThumbnailWrapper>
          <InfoWrapper>
            <View>
              <BookTitle>{bookItem.title}</BookTitle>
              <Author>
                {'by '}
                {bookItem.authors}
              </Author>
              <PriceWrapper>
                <Price>$9.99</Price>
                <Rating>
                  <Icon
                    name="md-star"
                    size={15}
                    color={colors.darker}
                    style={styles.rateIcon}
                  />
                  <Icon
                    name="md-star"
                    size={15}
                    color={colors.darker}
                    style={styles.rateIcon}
                  />
                  <Icon
                    name="md-star"
                    size={15}
                    color={colors.darker}
                    style={styles.rateIcon}
                  />
                  <Icon
                    name="md-star"
                    size={15}
                    color={colors.darker}
                    style={styles.rateIcon}
                  />
                  <Icon
                    name="md-star"
                    size={15}
                    color={colors.yep}
                    style={styles.rateIcon}
                  />
                </Rating>
              </PriceWrapper>
            </View>
            <ButtonsWrapper>
              <BuyButton onPress={() => {}}>
                <BuyButtonText>Buy</BuyButtonText>
              </BuyButton>
              <LikeButton onPress={() => {}}>
                <Icon
                  name="md-heart-empty"
                  size={24}
                  color={colors.white}
                  style={styles.likeIcon}
                />
              </LikeButton>
            </ButtonsWrapper>
          </InfoWrapper>
        </BookWrapper>
        <DescriptionWrapper>
          <Description>{bookItem.info}</Description>
        </DescriptionWrapper>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  likeIcon: {
    marginTop: 3,
  },
  rateIcon: {
    marginRight: 4,
  },
  thumbnail: {
    height: 130,
    width: 100,
  },
});

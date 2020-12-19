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
import AntDesign from 'react-native-vector-icons/AntDesign';

import styled from 'styled-components/native';
import {colors, metrics} from '../styles';

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
    fetch('http://165.232.77.107:3003/book/' + this.state.bId)
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

"""empty message

Revision ID: 1d9bd5ccdbd5
Revises: 
Create Date: 2023-09-26 16:03:42.229109

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1d9bd5ccdbd5'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('consumers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('address', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('id')
    )
    op.create_table('supermarkets',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('address', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('id')
    )
    op.create_table('products',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('image', sa.String(), nullable=True),
    sa.Column('price', sa.Integer(), nullable=False),
    sa.Column('label', sa.String(), nullable=False),
    sa.Column('consumer_id', sa.Integer(), nullable=True),
    sa.Column('supermarket_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['consumer_id'], ['consumers.id'], name=op.f('fk_products_consumer_id_consumers')),
    sa.ForeignKeyConstraint(['supermarket_id'], ['supermarkets.id'], name=op.f('fk_products_supermarket_id_supermarkets')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('cart_items',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('consumer_id', sa.Integer(), nullable=True),
    sa.Column('product_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['consumer_id'], ['consumers.id'], name=op.f('fk_cart_items_consumer_id_consumers')),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], name=op.f('fk_cart_items_product_id_products')),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('id')
    )
    op.create_table('prices',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('price', sa.Float(), nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=True),
    sa.Column('supermarket_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], name=op.f('fk_prices_product_id_products')),
    sa.ForeignKeyConstraint(['supermarket_id'], ['supermarkets.id'], name=op.f('fk_prices_supermarket_id_supermarkets')),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('prices')
    op.drop_table('cart_items')
    op.drop_table('products')
    op.drop_table('supermarkets')
    op.drop_table('consumers')
    # ### end Alembic commands ###
